import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { EditorState, RichUtils,  convertToRaw, convertFromRaw} from "draft-js";
import {Editor} from 'react-draft-wysiwyg'
import 'draft-js/dist/Draft.css';

const NoteEditor = ({content, handleAutoSave}) => {
    
    const contentState = convertFromRaw(JSON.parse(content))
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState))

    

	const onChange = newEditorState => {
        setEditorState(newEditorState)
		const data = newEditorState.getCurrentContent()
		const content = JSON.stringify(convertToRaw(data))
        handleAutoSave(content)
    }

	// const handleKeyCommand = command => {
	// 	const newState = RichUtils.handleKeyCommand(
	// 		editorState,
	// 		command
	// 	);
	// 	if (newState) {
	// 		onChange(newState);
	// 		return "handled";
	// 	}
	// 	return "not-handled";
	// };

	// const onUnderlineClick = () => {
	// 	onChange(
	// 		RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
	// 	);
	// };

	// const onBoldClick = () => {
	// 	onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
	// };

	// const onItalicClick = () => {
	// 	onChange(
	// 		RichUtils.toggleInlineStyle(editorState, "ITALIC")
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
            {/* <button onClick={onUnderlineClick}>U</button>
            <button onClick={onBoldClick}>
                <b>B</b>
            </button>
            <button onClick={onItalicClick}>
                <em>I</em>
            </button> */}
            <div className="editors">
                {/* <Editor
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={onChange}
                /> */}
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
    );
	
}

export default NoteEditor;