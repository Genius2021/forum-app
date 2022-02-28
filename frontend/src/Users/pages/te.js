let myRichTextEditor = new (function() {

	let self = this;

	self.init = function(args) {


		//load icons
		// loadIcons();

		//hide the textarea
		// document.getElementById(args.selector).style.display = 'none';

		let defaultElements = [
			{command: 'bold', type: 'button', innerHTML: <i className="fa fa-bold"></i>},
			{command: 'italic', type: 'button', innerHTML: <i className="fa fa-italic"></i>},
			{command: 'underline', type: 'button', innerHTML: <i className="fa fa-underline"></i>},
			{command: 'strikeThrough', type: 'button', innerHTML: <i className="fa fa-strikethrough"></i>},
			{command: 'justifyCenter', type: 'button', innerHTML: <i className="fa fa-align-center"></i>},
			{command: 'justifyFull', type: 'button', innerHTML: <i className="fa fa-align-justify"></i>},
			{command: 'justifyLeft', type: 'button', innerHTML: <i className="fa fa-align-left"></i>},
			{command: 'justifyRight', type: 'button', innerHTML: <i className="fa fa-align-right"></i>},

			//new buttons added
			{command: 'insertUnorderedList', type: 'button', innerHTML: <i className="fa fa-list-ul"></i>},
			{command: 'insertOrderedList', type: 'button', innerHTML: <i className="fa fa-list-ol"></i>},
			{command: 'indent', type: 'button', innerHTML: <i className="fa fa-indent"></i>},
			{command: 'outdent', type: 'button', innerHTML: <i className="fa fa-outdent"></i>},
			{command: 'formatBlock', type: 'select', innerHTML: '', options: ['H1', 'H2', 'H3', 'H4']},
			{command: 'insertHorizontalRule', type: 'button', innerHTML: 'HR'},
			{command: 'createLink', type: 'button', innerHTML: <i className="fa fa-link"></i>},
			{command: 'unlink', type: 'button', innerHTML: <i className="fa fa-unlink"></i>},
			{command: 'fontName', type: 'select', innerHTML: '', options: ['Arial', 'Comic Sans MS', 'Courier', 'Georgia', 'Times New Roman', 'Verdana']},
			{command: 'fontSize', type: 'select', innerHTML: '', options: [1, 2, 3, 4, 5, 6, 7]},
			{command: 'insertImage', type: 'button', innerHTML: <i className="fa fa-file-image"></i>},
			{command: 'viewSourceCode', type: 'button', innerHTML: <i className="fa fa-code"></i>},
			
		];


		//container
		let container = document.createElement('div');
		container.setAttribute('id', 'myRichTextEditorFieldContainer');
		container.appendAfter(document.getElementById(args.selector));


		//iframe editable
		let contentEditable = document.createElement('iframe');
		contentEditable.setAttribute('name', 'myRichTextEditorField');
		contentEditable.setAttribute('id', 'myRichTextEditorField');
		contentEditable.style.width = '100%';
		contentEditable.style.height = '500px';
		contentEditable.style.border = 'solid 1px lightgrey';

		container.appendChild(contentEditable);

	
		//make the iframe editor in the browser
		contentEditable.contentDocument.designMode = "on";

		//loop
		for(let el = 0 in defaultElements) {

			let thisElement;

			if (el > 0)
				thisElement = element;


			//create element
			let element = document.createElement(defaultElements[el].type);
			
			element.setAttribute('title', defaultElements[el].command);

			element.innerHTML = defaultElements[el].innerHTML;
			element.style.margin = '0 5px 5px 0';


			let command;
			let argument = null;

			//if its button
			if (defaultElements[el].type === 'button') {
			
				let showCode = false
				let isPrompt = false;

				element.onclick = function () {
					command = this.getAttribute('title'); //bold
					if (command == 'viewSourceCode') {
						//view source of the html tags
						showCode = execViewSourceCommand(element, contentEditable, showCode);
					} else {
						switch (command) {
							//for insert image
							case 'insertImage':
								argument = prompt('Enter your image URL: ');
								isPrompt = true;
								break;

							//for insert link
							case 'createLink':
								argument = prompt('Enter your URL: ');
								isPrompt = true;
								break;
						}

						if ((isPrompt && argument !== null) || !isPrompt)
							myRichTextEditorField.document.execCommand(command, false, argument);
					}
			
				};

			} else {
				//if not button

				//check if fonts or headings since those are droplists box
				if (isThisElement(defaultElements[el], 'fontName')
					|| isThisElement(defaultElements[el], 'fontSize')
					|| isThisElement(defaultElements[el], 'formatBlock')) {

					for(let o = 0 in defaultElements[el].options) {
						// create new option element
						let opt = document.createElement('option');

						// create text node to add to option element (opt)
						opt.appendChild( document.createTextNode(defaultElements[el].options[o]) );

						// set value property of opt
						opt.value = defaultElements[el].options[o]; 

						// add opt to end of select box (sel)
						element.appendChild(opt); 
					}
				}

				element.onchange = function () {
					command = this.getAttribute('title');
					myRichTextEditorField.document.execCommand(command, false, this.value);
				};

			}

			//append
			if (el > 0) {
				element.appendAfter(thisElement);
			} else {
				element.appendBefore(contentEditable);
			}
		}
	};


	Element.prototype.appendBefore = function( element) {
		
		element.parentNode.insertBefore(this, element);

	}, false;


	Element.prototype.appendAfter = function( element) {
		
		element.parentNode.insertBefore(this, element.nextSibling);

	}, false;


	// let loadIcons = function() {

	// 	let stylesheet = document.createElement('link');
	// 	stylesheet.href= 'https://use.fontawesome.com/releases/v5.8.1/css/all.css?integrity=sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf';
	// 	stylesheet.rel = 'stylesheet';
	// 	stylesheet.type ='text/css';

		//append to the head as a child
	// 	document.head.appendChild(stylesheet);

	// };


	function isThisElement(defaultElements, val) {
		return defaultElements.command === val;
	}


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


});