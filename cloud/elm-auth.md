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
  <p>Enter the Amazon Resource Name (ARN) of your bucket, and then assign permissions to Globus. Read-Only means that Globus can access and copy from your bucket, but cannot make changes to any objects/files.</p>
  <p>You can choose to allow Globus to alter your bucket's contents by uploading or deleting objects.</p>
  <hr>
  <form class="form-inline" id="elm-fieldset">
    <div class="form-row row">
      <div class="col-5">
        <label for="bucket" class="sr-only">Bucket</label>
        <input type="text" class="form-control bucket" name="bucket" id="bucket1" placeholder="Bucket example: arn:aws:s3:::allcats" />
      </div>
      <div class="form-check col-auto row-1">
        <input type="checkbox" class="checkbox" id="read1" name="read"/>
        <label for="read1">Read-Only?</label>
      </div>
      <div class="form-check col-auto">
        <input type="checkbox" name="uploads" id="uploads1" />
        <label for="uploads1">Allow Uploads?</label>
      </div>
      <div class="form-check col-auto">
        <input type="checkbox" class="checkbox" id="delete1" name="delete" />
        <label for="delete1">Allow Delete?</label>
      </div>
    </div>
  </form>
  <a class="flex-shrink-1 btn btn-outline-secondary btn-sm" id="clearButton"><i class="fa-solid fa-xmark"></i><span> Clear Form</span></a>

  <a class="flex-shrink-1 btn btn-outline-dark btn-sm float-end" id="addButton"><i class="fa-regular fa-plus"></i><span> Add A Bucket</span></a>
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