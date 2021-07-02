import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Editor, EditorState, convertFromRaw} from "draft-js";
import ReactTooltip from "react-tooltip";

const Note = ({info}) => {
    const content = info.body ? info.body : '{"blocks":[{"key":"335tn","text":"Esta es la prueba con negrita, subrayado y italico","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":22,"length":7,"style":"BOLD"},{"offset":31,"length":9,"style":"UNDERLINE"},{"offset":43,"length":7,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}'
    const contentState = convertFromRaw(JSON.parse(content))
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState))

    function myBlockStyleFn(contentBlock) {
        const type = contentBlock.getType();
        if (type === 'blockquote') {
          return 'block-with-image';
        }
    }

    return(
        <>
        
            <Link to={`/note/${info.id}`} >
                <div className="card glass-normal" data-tip data-for={info.title}>
                    {info.image !== null ? <img src={info.image} alt="Note image" /> : null}
                    <div className="card-text">
                    <h3>{info.title}</h3>

                        {info.image ? 

                        <div className="with-image">
                            <Editor editorState={editorState} blockStyleFn={info.image && myBlockStyleFn} readOnly={true} />
                        </div>

                        : 

                        <div className="no-image">
                            <Editor editorState={editorState} blockStyleFn={info.image && myBlockStyleFn} readOnly={true} />
                        </div>

                        }
                    </div>
                    
                    
                </div>

                <ReactTooltip id={info.title} place="top" effect="solid">
                    {info.title}
                </ReactTooltip>
            </Link>
            
        </>
    )
}

export default Note