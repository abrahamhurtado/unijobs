import React from 'react';
import TagsInput from 'react-tagsinput';

export default class Tags extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      tags: this.props.intereses || []
    }
  }
  handleChange (tags) {
    this.setState({tags})
  }
  render () {
    return (
      <TagsInput
        value={this.state.tags}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}
