import React, {PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {Spinner} from 'react-bootstrap'
import { connect } from 'react-redux'
import {updateUserImageAction} from '../../Actions/userActions'



class Uploader extends PureComponent {
    constructor(props){
    super(props)
        this.state = {
            src: null,
            fileTitle:"",
            crop: {
                unit: '%',
                width: 30,
                aspect: 1 / 1,
            },
            fileNotAccepted: false

        }
    }


    onSavePic = (e) => {
      e.preventDefault()
      const userData = {
        image: this.state.src,
        fileTItle: this.state.fileTitle,
        croppedImageUrl: this.state.croppedImageUrl,
        crop: this.state.crop
      }
      this.props.handleOnSave(this.props.userID, userData)
    }

    onSavedSuccessful = () => {
      setTimeout(()=>{
        window.location.reload()
      }, 3000)
      return <p className="alert alert-success">Imagen actualizada exitosamente</p>
    }
  
    onSelectFile = acceptedFiles => {
        if (acceptedFiles.length !== 0){
                    
            const currentFile = acceptedFiles[0]
            const title =  `${currentFile.path} - ${currentFile.size} bytes}`
            this.setState({
                fileTitle: title
            })
            const reader = new FileReader();
            reader.addEventListener('load', () =>{
                // console.log(reader.result)
                this.setState({ src: reader.result })
            });
            reader.readAsDataURL(currentFile);
            
        } else {

          this.setState({
            fileNotAccepted:true
          })
          setTimeout(()=>{
            this.setState({
              fileNotAccepted: false
            })
          }, 2000)

        }
                    
    };
    
    onCancel = () => {
        this.setState({src:null})
    }
  
    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
      this.imageRef = image;
    };
  
    onCropComplete = crop => {
      this.makeClientCrop(crop);
    };
  
    onCropChange = (crop, percentCrop) => {
      // You could also use percentCrop:
      // this.setState({ crop: percentCrop });
      this.setState({ crop });
    };
  
    async makeClientCrop(crop) {
      if (this.imageRef && crop.width && crop.height) {
        const croppedImageUrl = await this.getCroppedImg(
          this.imageRef,
          crop,
          'newFile.jpeg'
        );
        this.setState({ croppedImageUrl });
      }
    }
  
    getCroppedImg(image, crop, fileName) {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
  
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
  
      return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error('Canvas is empty');
            return;
          }
          blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(this.fileUrl);
        }, 'image/jpeg');
      });
    }
  
    render() {
      const { crop, croppedImageUrl, src } = this.state;
  
      return (
        <div className={this.props.className}> 
          
            {src ? (
                <div className="cropper-box">
                    <div  className="cropper-parts">
                        <ReactCrop
                        src={src}
                        crop={crop}
                        ruleOfThirds
                        onImageLoaded={this.onImageLoaded}
                        imageStyle={{maxHeight:"500px"}}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                        />
                        <div>
                          <button onClick={this.onCancel} disabled={this.props.loading ? true : false}>Cancelar</button>
                          <button style={{backgroundCOlor:"red"}} onClick={this.onSavePic} disabled={this.props.loading ? true : false}>{this.props.loading ? 'Esta sidabled' : 'NO esta'} </button>
                        </div>
                    </div>

                    {croppedImageUrl && (
                    <div className="cropper-parts">
                        {/* <img alt="Crop" style={{ Width: '100%' }} src={croppedImageUrl} /> */}
                        { this.props.saved === true ? this.savedSuccess() : null}
                        { this.props.error ? <div className="alert alert-danger">No se divudo actualizar la imagen</div> : null}
                        { this.props.loading ? <Spinner animation="border" variant="light" /> : null }
                    </div>                
                    )}

                </div> 

            ) : (

              <Dropzone 
                onDrop={acceptedFiles => this.onSelectFile(acceptedFiles)}
                maxFiles={!this.props.multiple && 1}
                accept="image/*"
                minSize={1024}
                maxSize={3072000}>
                  {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps({className: 'dropzone dropzone-box'})}>
                            {this.state.fileNotAccepted ?
                            
                          <div className="alert alert-danger">
                              File not accepted
                          </div>
                          :
                          <>
                            <input {...getInputProps()} />
                            <div className="uploader-icon"></div>
                            <p>Drag 'n' drop some files here, or click to select files</p>
                          </>
                          
                          }
                            
                        </div>
                        </section>
                    )}
                </Dropzone>
            )}
          
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return{
    error: state.userReducer.isError,
    loading: state.userReducer.isProcessing,
    saved:state.userReducer.isSaved
  }
}
const mapDispatchToProps = ()=>{
  return{
    updateUserImageAction
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Uploader)