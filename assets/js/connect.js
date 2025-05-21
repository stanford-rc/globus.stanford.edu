$(document).ready(function() {

  var fieldCounter = 1;
  const elmForm = $("#elm-fieldset");
  var arnPrefix = "arn:aws:s3:::"
  var versionMarker = "2012-10-17"
  bindEvents();
  startupCheckSession();

  function newFieldset() {
    fieldCounter = fieldCounter + 1;
    const newFieldset = document.createElement("div");
    newFieldset.className = "form-row row row-added row-" + fieldCounter;
    const bucketWrapper = document.createElement("div");
    bucketWrapper.className = "col-5";
    const label = document.createElement("label");
    label.className = "sr-only";
    label.htmlFor = "bucket" + fieldCounter;
    label.textContent = "Bucket";
    const input = document.createElement("input");
    input.type = "text";
    input.id = "bucket" + fieldCounter;
    input.name = "bucket";
    input.className = "form-control bucket";
    input.placeholder = getPlaceholder(fieldCounter);
    //put the input and the label inside the wrapper
    bucketWrapper.appendChild(input);
    bucketWrapper.appendChild(label);

    const readWrapper = document.createElement("div");
    readWrapper.className = "form-check col-auto";
    const readLabel = document.createElement("label");
    readLabel.htmlFor = "read" + fieldCounter;
    readLabel.textContent = "Read-Only?";

    const readBox = document.createElement("input");
    readBox.type = "checkbox";
    readBox.id = "read" + fieldCounter;
    readBox.className = "checkbox"
    readBox.name = "read";
    readWrapper.appendChild(readBox);
    readWrapper.appendChild(readLabel);

    const uploadWrapper = document.createElement("div");
    uploadWrapper.className = "form-check col-auto";
    const uploadLabel = document.createElement("label");
    uploadLabel.htmlFor = "uploads" + fieldCounter;
    uploadLabel.textContent = "Allow Uploads?";

    const uploadBox = document.createElement("input");
    uploadBox.type = "checkbox";
    uploadBox.id = "uploads" + fieldCounter;
    uploadBox.className = "checkbox"
    uploadBox.name = "uploads";
    uploadWrapper.appendChild(uploadBox);
    uploadWrapper.appendChild(uploadLabel);

    const deleteWrapper = document.createElement("div");
    deleteWrapper.className = "form-check col-auto";
    const deleteLabel = document.createElement("label");
    deleteLabel.htmlFor = "delete" + fieldCounter;
    deleteLabel.textContent = "Allow Delete?";

    const deleteBox = document.createElement("input");
    deleteBox.type = "checkbox";
    deleteBox.id = "delete" + fieldCounter;
    deleteBox.name = "delete";
    deleteBox.className = "checkbox"
    deleteWrapper.appendChild(deleteBox);
    deleteWrapper.appendChild(deleteLabel);

    newFieldset.appendChild(bucketWrapper);
    newFieldset.appendChild(readWrapper);
    newFieldset.appendChild(uploadWrapper);
    newFieldset.appendChild(deleteWrapper);

    elmForm.append(newFieldset);

  }

  function getPlaceholder(index) {
    const catContent = ["silly", "tiny", "many", "some", "orange", "black", "omg.so.many.", "smol", "lorge", "chonky", "calico", "cow", "baby"];
    let catLength = catContent.length - 1;
    if (index > catLength) {
      index = index - catLength;
    }
    catString = catContent[index] + "cats";
    return catString;
  }

  function bindEvents() {
    $("body").on("click", "input", function(e) {
      var node = e.target;
      generateScript();
    });

    $("#addButton").on("click", function() {
      newFieldset();
      generateScript();
    });

    $("#clearButton").on("click", function() {
      resetAllFields();
      generateScript();
    });

    $("#copyBtn").click(function() {
      var textToCopy = $("#resource");
      var text = textToCopy.val();
      copyTextToClipboard(text);
    })
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
        rowValueList = writeRowScriptList(bucket);
        statements.push(rowValueList);
        var readCheck = isChecked('read' + i);
        var deleteCheck = isChecked('delete' + i);
        var uploadCheck = isChecked('uploads' + i);
        rowValue = writeRowScript(bucket, deleteCheck, uploadCheck);
        saveRow(bucket, readCheck, deleteCheck, uploadCheck, i);
        evalCheckboxes(readCheck, deleteCheck, uploadCheck, i);
        statements.push(rowValue);
      }
    }
    return statements;
  }

  function writeRowScriptList(bucket) {
    let jsonRow = {};
    let listAction = [];

    listAction.push(
      "s3:ListBucket",
      "s3:ListBucketMultipartUploads",
    );
    let resource = [];
    resource.push(bucket);
    var bucketArn = arnPrefix + bucket;
    // Add key-value pairs
    jsonRow["Effect"] = "Allow";
    jsonRow["Action"] = listAction;
    jsonRow["Resource"] = bucketArn;
    return jsonRow;
  }


  function writeRowScript(bucket, deleteCheck, uploadCheck) {
    let jsonRow = {};
    let contentsAction = [];
    let listAction = [];

    contentsAction.push(
      "s3:GetObject",
      "s3:ListMultipartUploadParts",
    )
    if (deleteCheck) {
      contentsAction.push(
        "s3:DeleteObject"
      );
    }
    if (uploadCheck) {
      contentsAction.push(
        "s3:PutObject",
        "s3:AbortMultipartUpload",
      );
    }
    let resource = [];
    resource.push(bucket);
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

  function startupCheckSession() {
    sessionData = Object(sessionStorage);
    if (sessionData.length > 0) {
      //find the number of fieldset rows needed, subtract one for the row that is already there
      var fieldsets = sessionData.length / 4 - 1;
      for (var i = 1; i <= fieldsets; i++) {
        newFieldset();
      }

      $.each(sessionData, function(k, v) {
        if (v == "true") { //boolean for checkboxes
          $('#' + k).attr("checked", "checked");
        } else {
          $('#' + k).val(v);
        }
      });
      generateScript();
    }
  }

  function saveToSession(fieldId, fieldValue) {
    sessionStorage.setItem(fieldId, fieldValue);
  }

  function saveRow(bucket, readCheck, deleteCheck, uploadCheck, index) {
    saveToSession('bucket' + index, bucket);
    saveToSession('read' + index, readCheck);
    saveToSession('uploads' + index, uploadCheck);
    saveToSession('delete' + index, deleteCheck);
  }

  //utilities for copying the script

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

  //a bunch of utilities to handle checking and unchecking boxes, because this is why we crawled out of the ocean and became monkeys.

  function resetAllFields() {
    elmForm[0].reset();
    $("input[type=checkbox").attr("checked", false).attr("disabled", false);
    sessionStorage.clear();
  }

  function isChecked(selector) {
    const node = document.getElementById(selector);
    if (node && node.type === "checkbox" && node.checked) {
      return true;
    }
    return false;
  }

  function evalCheckboxes(readCheck, deleteCheck, uploadCheck, index) {
    const readId = "#read" + index;
    const deleteId = "#delete" + index;
    const uploadId = "#uploads" + index;
    if (readCheck) {
      setReadOnly(uploadId, deleteId);
    } else {
      uncheckRead(readId);
      if (deleteCheck || uploadCheck) {
        disableRead(readId);
      } else {
        resetCheckboxes(uploadId, deleteId, readId);
      }
    }
  }

  function setReadOnly(uploadId, deleteId) {
    console.log("setReadOnly", deleteId);
    uncheckUploads(uploadId);
    disableUploads(uploadId);
    uncheckDelete(deleteId);
    disableDelete(deleteId);
  }

  function resetCheckboxes(uploadId, deleteId, readId) {
    console.log("resetCheckboxes", deleteId);
    uncheckRead(readId);
    uncheckUploads(uploadId);
    uncheckDelete(deleteId)
    enableRead(readId);
    enableUploads(uploadId);
    enableDelete(deleteId);
  }

  function disableRead(readId) {
    const readBox = $(readId);
    readBox.prop('disabled', true);
  }

  function enableRead(readId) {
    const readBox = $(readId);
    readBox.prop('disabled', false);
  }

  function uncheckRead(readId) {
    const readBox = $(readId);
    readBox.prop('checked', false);
  }

  function uncheckUploads(uploadId) {
    const uploadBox = $(uploadId);
    uploadBox.prop('checked', false);
  }

  function disableUploads(uploadId) {
    const uploadBox = $(uploadId);
    uploadBox.prop('disabled', true);
    console.log('disableUploads', uploadId);
  }

  function enableUploads(uploadId) {
    const uploadBox = $(uploadId);
    uploadBox.prop('disabled', false);
  }

  function uncheckDelete(deleteId) {
    console.log("uncheckDelete", deleteId);
    const deleteBox = $(deleteId);
    deleteBox.prop('checked', false);
  }

  function disableDelete(deleteId) {
    console.log("disableDelete", deleteId);
    const deleteBox = $(deleteId);
    deleteBox.prop('disabled', true);
  }

  function enableDelete(deleteId) {
    console.log("enableDelete", deleteId);
    const deleteBox = $(deleteId);
    deleteBox.prop('checked', false).prop('disabled', false);
  }

});