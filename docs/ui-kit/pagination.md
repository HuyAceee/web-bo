This documents describe Pagination component . The buttons is extended from **Pagination** component from PrimeVue UI-Kit collection.
You can read more about it [here](https://primevue.org/paginator/)

## Pagination

The CSS class was written in file **welfare-pagination.css**. The Vue component is **WelfarePagination**.
You can see detail more in file **PaginationView**.

<img src="../captures/pagination.jpg">

###### Quick render

```html
<WelfarePagination
  :rows="10"
  :pageLinkSize="10"
  :totalRecords="100"
  @update:first="eventFirst"
  @update:rows="eventRows"
  @page="eventPage"
></WelfarePagination>
```

#### Props

We extends [**Pagination**](https://primevue.org/paginator/) props (PrimeVue). Below, we add some additional props properties in **WelfarePagination** component.

Name | Type | Description
------------- | ------------- | -------------
totalRecords | number | Number of total records.
rows | number | Data count to display per page.
pageLinkSize | number | Number of page links to display.

#### Emits

Defines valid emits in **WelfareEditor** component.
Name | Parameters | ReturnType | Description
------------- | ------------- | ------------- | -------------
page | event : PageState | void | Callback to invoke when page changes, the event object contains information about the new state.	
update:first | value : number | void | Emitted when the first changes.	
update:rows | value : number | void | Emitted when the rows changes.		

