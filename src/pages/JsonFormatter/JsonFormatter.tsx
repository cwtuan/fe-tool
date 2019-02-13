import React, { Component, ChangeEvent } from 'react';
import { FormComponentProps } from "antd/lib/form/Form";
import { Input, Row, Col } from 'antd';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/tomorrow';

const styles = require("./JsonFormatter.less");

interface Props extends FormComponentProps {
}

interface State {
  source: string;
  target: string;
}


export default class JsonFormatter extends Component<Props, State> {

  state: State = {
    source: null,
    target: "",
  }

  render() {
    const { } = this.props;
    const { source, target } = this.state;
    return (
      <div className={styles.main}>
        <h1>Online JSON Formatter</h1>
        <div className={styles.content}>
          <Row>
            <Col span={8}>
              <AceEditor
                width="400"
                // height="50vh"
                debounceChangePeriod={200}
                mode="javascript"
                name="ace-editor-source"
                tabSize={2}
                defaultValue={`{"a":"aaa","b":"aaa","c":{"d":123}}`}
                onChange={this.onSourceChange}
                value={source}
              />
            </Col>
            <Col span={2}>XXX</Col>
            <Col span={14}>
              <AceEditor
                width="400"
                // height="50vh"
                mode="javascript"
                name="ace-editor-target"
                tabSize={2}
                value={target}
              />

            </Col>
          </Row>
        </div>
      </div>
    );
  }

  private onSourceChange = (source: string) => {
    let target = '';
    try {
      target = JSON.stringify(JSON.parse(source), null, 2)
    } catch {

    }
    this.setState({
      source,
      target,
    });
  }
}

