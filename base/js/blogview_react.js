
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      blogs: []
    };
  }

  componentDidMount() {
    fetch("https://herestohope.onrender.com/blogs")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            blogs: result.blogs
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, blogs } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const regEx = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
      return (
       blogs.map(b => {
        return (
          <div class="box">
          <div className="image-container">
            <img src={b.image} className="picPrev"/>
          </div>
          <a href={`./blog-view.html?index=${b._id}`} >
            <h2>{b.title}</h2>
          </a>
          <p className="par">{b.content.substring(0, 100).replaceAll(regEx, "")}</p>
          <div className="foot">
            <div className="likes">
            </div>
            <div className="coments">
            </div>
            <div className="views">
            </div>
          </div>
          </div>
        )
       })
      );
    }
  }
}
ReactDOM.render(<MyComponent />, document.querySelector(".content"))

