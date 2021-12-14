import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {marked} from 'marked';

const navBar = "mx-2 px-3 py-2 h5 navb roundCorner";
const maxArrow = "fas fa-expand-arrows-alt";
const minArrow = "fas fa-compress-arrows-alt";

class Editor extends React.Component {
  render() {
    const previewState = this.props.previewMax? "min": "";
    const editorArrow = this.props.editorMax? minArrow: maxArrow;

    return (
      <div className={previewState}>
        <div className={navBar}>
          <i className="fab fa-free-code-camp"></i> Editor <i className={editorArrow} onClick={this.props.editorMaxWindow}></i>
        </div>
        <div className="mx-2 mb-3">
          <textarea id="editor" onChange={this.props.handleChange} value={this.props.textInput} className="form-control p-3 roundCorner"></textarea>
        </div>
      </div>
    )
  };
}

class Previewer extends React.Component {
  render() {
    const editorState = this.props.editorMax? "min": "";
    const previewArrow = this.props.previewMax? minArrow: maxArrow;

    return (
      <div className={editorState}>
        <div className={navBar}>
          <i className="fab fa-free-code-camp"></i> Previewer <i className={previewArrow} onClick={this.props.previewMaxWindow}></i>
        </div>
        <div className="mx-2 mb-3">
          <div id="preview" className="p-3 roundCorner" dangerouslySetInnerHTML={{__html: marked(this.props.textInput, {breaks: true})}}></div>
        </div>
      </div>
    )
  };
}

const initialState =
`# We have a h1 header here
## and a h2 header here,

together with a link to the [GitHub markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet),

a \`inline\` code,

a code block:

\`\`\`
Some random code using escaped characters
\`\`\`

a random list:
- Item 1
- Item 2
- Item 3

a blockquote:

> THIS IS A BLOCKQUOTE

and of course a **not-so-random** image:

![alt text](https://gravatar.com/avatar/1cb6180e099cb10200b9e7acb4285818?d=https%3A%2F%2Fassets.codepen.io%2Finternal%2Favatars%2Fusers%2Fdefault.png "CODEPEN Logo")`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: initialState,
      editorMax: false,
      previewMax: false
    };
  };

  editorMaxWindow() {
    this.setState({
      editorMax: !this.state.editorMax
    });
  };

  previewMaxWindow() {
    this.setState({
      previewMax: !this.state.previewMax
    });
  };

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  };

  render() {
    const editorMaxed = this.state.editorMax? "col-12 mb-3": document.documentElement.clientWidth<500? "col-12": "col-6";
    const previewMaxed = this.state.previewMax? "col-12": document.documentElement.clientWidth<500? "col-12": "col-6";

    return (
      <div className="container-fluid">
        <h1 className="text-center my-4 title">Songyu's Markdown Previewer</h1>
        <div className="row">
          <div className={editorMaxed}>
            <Editor textInput={this.state.input} handleChange={this.handleChange.bind(this)} editorMax={this.state.editorMax} previewMax={this.state.previewMax} editorMaxWindow={this.editorMaxWindow.bind(this)}/>
          </div>
          <div className={previewMaxed}>
            <Previewer textInput={this.state.input} editorMax={this.state.editorMax} previewMax={this.state.previewMax} previewMaxWindow={this.previewMaxWindow.bind(this)}/>
          </div>
        </div>
      </div>
    )
  };
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
