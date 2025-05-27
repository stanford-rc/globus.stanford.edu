$(document).ready(function() {

  var fieldCounter = 1;
  const elmForm = $("#elm-fieldset");
  var arnPrefix = "arn:aws:s3:::"
  var versionMarker = "2012-10-17"
  const selectOptions = [{ "name": "Read-Only", "icon": "eye", "value": "read", "class": "bg-success text-dark bg-opacity-25" }, { "name": "Read + Write", "icon": "pencil", "value": "upload", "class": "bg-warning text-dark bg-opacity-25" }, { "name": "Read + Write + Delete", "icon": "warning", "value": "delete", "class": "bg-danger text-dark bg-opacity-25" }];
  startupCheckSession();
  bindEvents();
  bindNew();

  function newFieldsetSelect(index) {
    //console.log('fieldcounter', index);
    const label = document.createElement("label");
    label.className = "sr-only";
    label.htmlFor = "bucket" + index;
    label.textContent = "Bucket";
    const newFieldset = document.createElement("div");
    newFieldset.prepend(label);
    newFieldset.className = "row-added input-group row-" + index;
    const input = document.createElement("input");
    input.type = "text";
    input.id = "bucket" + index;
    input.name = "bucket";
    input.className = "form-control bucket";
    input.placeholder = getPlaceholder(index);
    newFieldset.appendChild(input);

    const select = document.createElement("select");
    select.id = "permissions" + index;
    select.className = "form-select permissions"
    select.dataset.row = index;
    newFieldset.appendChild(select);

    const iconBlock = document.createElement("span");
    iconBlock.className = "bg-success text-dark bg-opacity-25 input-group-text";
    const icon = document.createElement("i");
    icon.ariaHidden = true;
    icon.className = "fa fa-eye";
    iconBlock.id = "icon" + index;
    iconBlock.append(icon);
    //console.log('iconBlock', iconBlock);
    newFieldset.appendChild(iconBlock);

    const removeButton = document.createElement("div");
    removeButton.className = "remove-btn";
    removeButton.id = "remove" + index;
    removeButton.dataset.remove = index;
    const removeIcon = document.createElement("i");
    removeIcon.ariaHidden = true;
    removeIcon.className = "fa-solid fa-xmark";
    removeButton.append(removeIcon);
    newFieldset.appendChild(removeButton);
    //console.log('newFieldset', newFieldset);
    elmForm.append(newFieldset);
    const selectOptionList = selectOptionCreate(selectOptions, select.id);
    bindNew();
  }

  function selectOptionCreate(selectOptions, selector) {
    //loop through options
    let i = 0;
    var option = "";
    let select = $('#' + selector);
    //console.log('select', select);

    while (selectOptions[i]) {
      var thisOption = selectOptions[i];
      const optionLine = document.createElement("option");
      optionLine.value = thisOption.value;
      optionLine.text = thisOption.name;
      optionLine.dataset.icon = thisOption.icon;
      //console.log('optionLine', optionLine);
      select.append(optionLine);
      i++;
    }
  }

  function getPlaceholder(index) {
    const catContent = ["silly", "tiny", "many", "some", "orange", "black", "omg.so.many.", "smol", "lorge", "chonky", "calico", "cow", "baby"];
    let catLength = catContent.length - 1;
    var catString = "bucket-of-cats";
    if (index > catLength) {
      index = index - catLength;
    }
    if (catContent[index]) {
      catString = catContent[index] + "cats";
    }
    return catString;
  }

  function bindEvents() { //this fires once

    $("#addButton").on("click", function(e) {
      //make sure it's an integer
      fieldCounter = parseInt(fieldCounter, 10);
      fieldCounter = fieldCounter + 1;
      newFieldsetSelect(fieldCounter);
    });

    $("#clearButton").on("click", function() {
      resetAllFields();
      generateScript();
    });

    $("#copyBtn").click(function() {
      var textToCopy = $("#resource");
      var text = textToCopy.val();
      copyTextToClipboard(text);
    });

  }

  function bindNew() { //this fires when new fields are added

    $(".remove-btn").on("click", function(e) {
      //console.log('remove', e.currentTarget.dataset.remove);
      var removeTag = e.currentTarget.dataset.remove;
      removeRow(removeTag);
    });
    $(".bucket").on("input", function(e) {
      generateScript();
    });

    $(".permissions").on("change", function(e) {
      var icon = e.target.selectedOptions[0].dataset.icon;
      var id = e.target.id;
      var row = e.target.dataset.row;
      generateScript();
      checkIcon(id, row, icon);
    });
  }

  function getRow() {
    let statements = [];
    var rowValue = "";
    var rowValueList = "";
    //create allow list rule for *
    let autoEntry = {};
    autoEntry["Effect"] = "Allow";
    autoEntry["Action"] = "s3:ListAllMyBuckets";
    autoEntry["Resource"] = "*";
    statements.push(autoEntry);
    //loop through fields
    for (var i = 1; i <= fieldCounter; i++) {
      var bucket = $('#bucket' + i).val();
      if (bucket) {
        bucketPermissions = $('#permissions' + i).val();
        rowValueList = writeRowScriptList(bucket, bucketPermissions);
        statements.push(rowValueList);
        rowValueContents = writeRowScriptContents(bucket, bucketPermissions);
        statements.push(rowValueContents);
        saveRow(bucket, bucketPermissions, i);
      }
    }
    return statements;
  }

  function removeRow(id) {
    var exitRow = $('.row-' + id);
    var exitBucket = "bucket" + id;
    var exitLabel = $("label[for=" + exitBucket + "]");
    exitRow.remove();
    exitLabel.remove();
    //remove from storage
    deleteRow(id);
  }

  function writeRowScriptList(bucket, bucketPermissions) {
    let jsonRow = {};
    let listAction = [];

    listAction.push(
      "s3:ListBucket",
      "s3:ListBucketMultipartUploads",
    );
    var bucketArn = arnPrefix + bucket;
    // Add key-value pairs
    jsonRow["Effect"] = "Allow";
    jsonRow["Action"] = listAction;
    jsonRow["Resource"] = bucketArn;
    return jsonRow;
  }

  function writeRowScriptContents(bucket, bucketPermissions) {
    let jsonRow = {};
    let contentsAction = [];

    contentsAction.push(
      "s3:GetObject",
      "s3:ListMultipartUploadParts",
    )
    if (bucketPermissions == "upload" || bucketPermissions == "delete") {
      contentsAction.push(
        "s3:PutObject",
        "s3:AbortMultipartUpload",
      );
    }
    if (bucketPermissions == "delete") {
      contentsAction.push(
        "s3:DeleteObject"
      );
    }
    var bucketArn = arnPrefix + bucket;
    // Add key-value pairs
    jsonRow["Effect"] = "Allow";
    jsonRow["Action"] = contentsAction;
    jsonRow["Resource"] = bucketArn + "/*";
    return jsonRow;
  }

  function generateScript() {
    let output = {};
    output["Version"] = versionMarker;
    var guts = getRow();
    output["Statement"] = guts;
    var jsonPretty = JSON.stringify(output, null, '\t');
    //make size of textarea auto-grow
    $('#resource').height('auto').empty();
    $('#resource').val(jsonPretty);
    var slurmHeight = $('#resource').height();
    var scroll = $('#resource').prop('scrollHeight');
    if (slurmHeight != "auto") {
      if (scroll > slurmHeight) {
        $('#resource').height(scroll + "px");
      }
    }
  }

  $(document).on('input', '.autoresizing', function(e) {
    generateScript();
    this.style.height = 'auto';
    this.style.height =
      (this.scrollHeight) + 'px';
  });

  // local storage

  function getStoredRows(rows) {
    //console.log('sessionData', rows);
    let maxKey = 0;
    //get all the row keys
    var filtered = {}
    for (key in rows) {
      if (key.match(/^row/)) filtered[key] = rows[key];
    }
    //console.log('sessionData filtered', filtered);
    for (const [key, value] of Object.entries(filtered)) {
      //console.log(key, value);
      if (value > maxKey) {
        //console.log(value, maxKey);
        maxKey = value
      }
    }
    //console.log('maxKey', maxKey)
    //set fieldset equal to maxKey
    fieldCounter = maxKey;
    return maxKey;
  }

  function startupCheckSession() {
    sessionData = Object(sessionStorage);
    if (sessionData.length > 0) {
      //get the highest row number of the stored fields - this may not equal the count because rows can be removed
      var rowNumber = getStoredRows(sessionData);
      for (var i = 1; i <= rowNumber; i++) {
        var bucketID = 'bucket' + i;
        //is there a saved item for this?
        if (sessionData[bucketID]) {
          //console.log('got it', bucketID);
          var rowID = 'row-' + i;
          var bucketVal = sessionData[bucketID];
          var permID = 'permissions' + i;
          var permVal = sessionData[permID];
          //is there already an element with that id?
          if ($('#' + bucketID).length) {
            //console.log('element exists',bucketID)

          } else {
            newFieldsetSelect(i);
          }
          $('#' + bucketID).val(bucketVal);
          $('#' + permID).val(permVal);
          var thisIcon = getIconByValue(permVal);
          checkIcon(rowID, i, thisIcon);
          generateScript()
        } //end have bucket
      } //end for loop
      generateScript();
    }
  }

  function saveToSession(fieldId, fieldValue) {
    sessionStorage.setItem(fieldId, fieldValue);
  }

  function saveRow(bucket, permissions, index) {
    saveToSession('row-' + index, index);
    saveToSession('bucket' + index, bucket);
    saveToSession('permissions' + index, permissions);
  }

  function deleteRow(index) {
    sessionStorage.removeItem('row-' + index);
    sessionStorage.removeItem('bucket' + index)
    sessionStorage.removeItem('permissions' + index)
  }

  function resetAllFields() {
    elmForm[0].reset();
    sessionStorage.clear();
    checkIcon("all", "all", "eye");
  }

  //utilities for copying the script to the clipboard, because this is why we crawled out of the ocean and became monkeys.

  async function copyTextToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      notifyCopy();
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  function notifyCopy() {
    baseWidth = $('#copyBtn').width();
    $('#copyBtn').width(baseWidth);
    copyBling();
    setTimeout(function() {
      copyUnBling();
    }, 1000); // Delay in milliseconds
  }

  function copyBling() {
    $('#copyBtn').addClass('funkytown');
    $('.fancy-copy').addClass('copied');
    $('#copyBtn span').text(' Copied!');
    $('#copyBtn i').addClass('fa-beat');
    $('#copyBtn i').addClass('fa-solid fa-clipboard-check');
    $('#copyBtn i').removeClass('fa-regular fa-clipboard');
  }

  function copyUnBling() {
    $('#copyBtn').removeClass('funkytown');
    $('.fancy-copy').removeClass('copied');
    $('#copyBtn span').text(' Copy to Clipboard');
    $('#copyBtn i').removeClass('fa-beat');
    $('#copyBtn i').removeClass('fa-solid fa-clipboard-check');
    $('#copyBtn i').addClass('fa-regular fa-clipboard');
  }

  // icon utilities

  function getIconByValue(value) {
    const option = selectOptions.find(option => option.value === value);
    return option ? option.icon : undefined;
  }

  function getIconClassByIcon(icon) {
    const option = selectOptions.find(option => option.icon === icon);
    return option ? option.class : undefined;
  }

  function checkIcon(id, row, icon) {
    //console.log('checkIcon', id, row, icon);
    var rowValue = "read";
    var iconSpan = $(".input-group-text");
    var iconTag = $(".input-group-text i");
    if (id != "all") { //this isn't coming from resetAllFields
      rowValue = $('#' + id).val();
      iconSpan = $('#icon' + row);
      iconTag = $('#icon' + row + ' i');
    }
    //looking up the css for the icon
    var iconColorClass = getIconClassByIcon(icon);
    //console.log('iconColorClass', iconColorClass);
    iconSpanClass = iconColorClass + " input-group-text";
    iconSpan.removeClass().addClass(iconSpanClass);
    //the <i> tag where the icon lives
    var iconClass = 'fa fa-' + icon;
    iconTag.removeClass().addClass(iconClass);
  }

});