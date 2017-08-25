How to config?
==============

## Editor
```
editorID: {
  sections: [...] // REQ
}
```

### Section
```
{
  id: 'base'      // REQ
  title           // REQ
  description     // REQ
  interface: {    // REQ
    type          // REQ
    ...
  }
}
```

### Section.form
```
{
  type: 'form'    // REQ
  fields: [...]   // REQ
  options: {      // REQ
    labelWidth    // REQ - default labelWidth(4)
  }
}
```

#### Field
> Do not use formatter

```
{
  id              // REQ
  label           // REQ
  type            // REQ
  directory       // OPT - when type is 'select'
  defaultValue    // OPT
  disabled        // OPT
  updateForbidden // OPT - no update after create
  getTransformer  // OPT - GET → transformer → data
  postPreparer    // OPT - data → preparer → POST
  cascadeUpdate   // OPT
}
```

### Section.table
```
{
  type: 'table'               // REQ
  name                        // REQ - 單筆資料名稱，用於「新增」按鈕標籤
  propListIsCalled: 'columns' // REQ
  preparerKeyIsAt: 'prop'     // REQ
  columns: [...]              // REQ
}
```

#### Column
```
{
  id              // REQ
  prop            // REQ - same as id
  label           // REQ
  type            // REQ
  directory       // OPT - when type is 'select'
  updateForbidden // OPT
  formatter       // OPT - data → formatter → cell
  getTransformer  // OPT
  postPreparer    // OPT
  cascadeUpdate   // OPT
}
```

### Section.events
```
{
  type: 'events'                  // REQ
  propListIsCalled: 'attributes'  // REQ
  preparerKeyIsAt: 'id'           // REQ
  attributes: [...]               // REQ
}
```

#### Attribute
