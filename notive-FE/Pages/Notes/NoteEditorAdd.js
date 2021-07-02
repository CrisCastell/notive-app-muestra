import React, {useState} from "react";
import { EditorState, RichUtils,  convertToRaw} from "draft-js";
import {Editor} from 'react-draft-wysiwyg'
import 'draft-js/dist/Draft.css';

const NoteEditor = ({bodyOnChange}) => {
	

	const [editorState, setEditorState] = useState(EditorState.createEmpty())

	const onChange = newEditorState => {
		const data = newEditorState.getCurrentContent()
		const content = JSON.stringify(convertToRaw(data))

		bodyOnChange(content)
		setEditorState(newEditorState)
	};

	// handleKeyCommand = command => {
	// 	const newState = RichUtils.handleKeyCommand(
	// 		this.state.editorState,
	// 		command
	// 	);
	// 	if (newState) {
	// 		this.onChange(newState);
	// 		return "handled";
	// 	}
	// 	return "not-handled";
	// };

	// onUnderlineClick = () => {
	// 	this.onChange(
	// 		RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
	// 	);
	// };

	// onBoldClick = () => {
	// 	this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
	// };

	// onItalicClick = () => {
	// 	this.onChange(
	// 		RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
	// 	);
	// };

	function uploadImageCallBack(file) {
		return new Promise(
			(resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.open('POST', 'https://api.imgur.com/3/image');
				xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
				const data = new FormData();
				data.append('image', file);
				xhr.send(data);
				xhr.addEventListener('load', () => {
				const response = JSON.parse(xhr.responseText);
				resolve(response);
				});
				xhr.addEventListener('error', () => {
				const error = JSON.parse(xhr.responseText);
				reject(error);
				});
			}
		);
	}

	
	return (
		<div className="editorContainer">
			{/* <button onClick={this.onUnderlineClick}>U</button>
			<button onClick={this.onBoldClick}>
				<b>B</b>
			</button>
			<button onClick={this.onItalicClick}>
				<em>I</em>
			</button> */}
			<div className="editors">
				<Editor
					editorState={editorState}
					onEditorStateChange={onChange}    
						toolbar={{
						inline: { inDropdown: true },
						list: { inDropdown: true },
						textAlign: { inDropdown: true },
						link: { inDropdown: true },
						history: { inDropdown: true },
						image: { uploadCallback: uploadImageCallBack, alt: { present: false, mandatory: false } },
					}}
				/>
			</div>
		</div>
	)
	
}

export default NoteEditor;