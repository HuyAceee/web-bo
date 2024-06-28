This documents describe text box component. The buttons is extended from **Input Text** components from PrimeVue UI-Kit collection.
You can read more about it [here](https://primevue.org/inputtext/)


The CSS class was written in file **welfare-input.css**. The Vue component is **WelfareInputText**.
You can see detail more in file **TextBoxView**.

```html
    <div class="wf-mr-89 wf-space-y-22 ">
        <WelfareInputText labelBottomLeft="text" labelBottomRight="text" class="wrap-input-text-box-388" placeholder="텍스트" />   
        <WelfareInputText labelBottomLeft="text" labelBottomRight="text" class="wrap-input-text-box-388 wf-text-box-active" placeholder="텍스트" />    
        <WelfareInputText labelBottomLeft="text" labelBottomRight="text" class="wrap-input-text-box-388" v-model="defaultInputText1" placeholder="텍스트" />  
        <WelfareInputText labelBottomLeft="text" labelBottomRight="text" class="wrap-input-text-box-388" disabled placeholder="텍스트" />      
        <WelfareInputText labelBottomLeft="text" labelBottomRight="text" class="wrap-input-text-box-388 wf-text-box-negative" v-model="defaultInputTextNegative1" placeholder="텍스트" />  
    </div>
```

#### Props
Defines valid properties in **WelfareInputText** component.
Name  | Type  | Description
------------- | ------------- | -------------
modelValue  | string | Text of the input text.
size  | 'small', 'large' | Size of input text
labelTop  | string | The label top of input text
labelLeft  | string | The label left of input text
labelBottomLeft  | string | The label bottom left of input text
labelBottomRight  | string | The label bottom right of input text
inputType  | any | The input type of input text
icon  | any | The icon of right button
#### Emits
Defines valid emits in **WelfareInputText** component.
Name  | Parameters |   ReturnType  | Description
------------- |  ------------- | ------------- | -------------
update:modelValue  | value: any | void | Emitted when the value changes.
clickIconRight  | value: Event | void | Emitted when click to right icon