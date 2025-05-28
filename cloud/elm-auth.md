---
layout:      page
toc:  false
title:       Globus and Elm Authorization
see-also: true
id: cloud
description: Generate a user policy
customjs: /assets/js/connect.js
---

<div>
  <h2>Buckets </h2>
  <p>Enter the name of your bucket, and then assign permissions to Globus. Read-Only means that Globus can access and copy from your bucket, but cannot make changes to any objects/files.</p>
  <p>You can choose to allow Globus to alter your bucket's contents by uploading or deleting objects.</p>
  <hr>
  <form class="form-inline" id="elm-fieldset" spellcheck="false" autocorrect="off" autocapitalize="off">
    <div class="alert alert-danger space-warning" role="alert">
      Bucket names cannot have spaces
    </div>
    <div class="input-group row-1" data-row="1">
      <label for="bucket1" class="sr-only">Bucket</label>
      <input type="text" id="bucket1" name="bucket" class="form-control bucket" placeholder="Bucket example: allcats">
      <select id="permissions1" class="form-select permissions" data-row="1">
        <option value="read" data-icon="eye">Read-Only</option>
        <option value="upload" data-icon="pencil">Read + Write</option>
        <option value="delete" data-icon="warning">Read + Write + Delete</option>
      </select>
      <span class="bg-success text-dark bg-opacity-25 input-group-text" id="icon1">
        <i aria-hidden="true" class="fa fa-eye"></i>
      </span>
      <div class="remove-btn" id="remove1" data-remove="1"><i class="fa-solid fa-xmark"></i></div>
    </div>
  </form>
  <a class="flex-shrink-1 btn btn-outline-secondary" id="clearButton"><i class="fa-solid fa-xmark"></i><span> Clear Form</span></a>
  <a class="flex-shrink-1 btn btn-outline-dark float-end" id="addButton"><i class="fa-regular fa-plus"></i><span> Add A Bucket</span></a>
</div>
<div class="">
  <div class="form-horizontal">
    <h2><label for="resource">Local Permissions Summary</label> </h2>
    <a class="flex-shrink-1 btn btn-outline-success btn-sm" id="copyBtn"><i class="fa-solid fa-copy"></i><span> Copy to Clipboard</span></a>
    <div class="fancy-copy">
      <textarea id="resource" class="form-control" rows="16" readonly></textarea>
      <i id="copyOverlay" class="fa-solid fa-clipboard-check"></i>
    </div>
  </div>
</div>