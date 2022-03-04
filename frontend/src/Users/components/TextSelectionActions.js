
 const TextSelectionActions = (e, currentElem)=>{
    // e.target.value, e.target.selectedIndex ...the value gives you the value directly. But the selectedIndex gives you the index of the selected option
      e.preventDefault();
      let command = currentElem.command;
      console.log(command, e.target)
      let showCode = false;
      if(currentElem.type === "button"){

      if(currentElem.command === 'viewSourceCode'){

        function execViewSourceCommand(element, contentEditable, showCode) {
          if (!showCode) {
            contentEditable.contentDocument.getElementsByTagName('body')[0].textContent = contentEditable.contentDocument.getElementsByTagName('body')[0].innerHTML;
            showCode = true;
          } else {
            contentEditable.contentDocument.getElementsByTagName('body')[0].innerHTML = contentEditable.contentDocument.getElementsByTagName('body')[0].textContent;
            showCode = false;
          }
      
          return showCode;
        }

      //  execViewSourceCommand(currentElem, iframeState, showCode);

      }else{

        let isPrompt = false; 
        let argument = null;

        switch (command) {  

          //for insert image
          case 'insertImage':
            argument = prompt('Enter your image URL: ');
            isPrompt = true;
            document.getElementById("iframeTextField").contentWindow.document.execCommand(command, false, argument); 
            break;

          case 'foreColor':
            argument = e.target.value;
            document.getElementById("iframeTextField").contentWindow.document.execCommand(command, false, argument); 
            break;

          case 'backColor':
            argument = e.target.value;
            document.getElementById("iframeTextField").contentWindow.document.execCommand(command, false, argument); 
            break;
         
          //for bold and others
          default:
            document.getElementById("iframeTextField").contentWindow.document.execCommand(command, false, argument); 
        }

        // document.getElementById("iframeTextField").contentWindow.document.execCommand(command, false, null); 
        // if ((isPrompt && argument !== null) || !isPrompt){
        //   iframeState.execCommand(command, false, argument);
        // }
      }

    }else{
      let argument = null;
      switch(command){

        case 'fontName':
          argument = e.target.value
          document.getElementById("iframeTextField").contentWindow.document.execCommand(command, false, argument); 
          break;

        case 'fontSize':
          argument = e.target.value
          document.getElementById("iframeTextField").contentWindow.document.execCommand(command, false, argument); 
          break;
        case 'formatBlock':
          argument = e.target.value
          document.getElementById("iframeTextField").contentWindow.document.execCommand(command, false, argument); 
          break;
        }

    }
     
    
  }


export default TextSelectionActions