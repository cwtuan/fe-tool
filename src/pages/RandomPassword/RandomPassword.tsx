import React, { Component } from 'react';
import { FormComponentProps, WrappedFormUtils } from "antd/lib/form/Form";
import { Form, notification, Button, Checkbox, InputNumber } from 'antd';
import { formItemLayout } from '@/core/constants';
import copy from 'copy-to-clipboard';
const CheckboxGroup = Checkbox.Group;
const styles = require("./RandomPassword.less");

const characterOptions = ['ABC', 'abc', '123', '!#$'];
const defaultCheckedCharacterOptions = ['ABC', 'abc', '123'];

interface FormConfig {
  characters: string[];
  length: number;
}

interface FormState {

}
interface FormProps extends FormComponentProps {
  onChange: () => void;
}

class PasswordConfigForm extends Component<FormProps, FormState> {
  // private handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  // }

  private onChange = () => {
    this.props.onChange();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form" onChange={this.onChange}>
        <Form.Item
          {...formItemLayout}
          label="Password Length"
        >
          {getFieldDecorator('length', {
            initialValue: 32,
            rules: [{ required: true }],
          })(
            <InputNumber />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Characters used"
        >
          {getFieldDecorator('characters', {
            initialValue: defaultCheckedCharacterOptions,
            rules: [{ required: true }],
          })(
            <CheckboxGroup options={characterOptions} />
          )}
        </Form.Item>
      </Form>
    );
  }
}

const WrappedPasswordConfigForm = Form.create<FormProps>()(PasswordConfigForm);


interface Props {
}

interface State {
  password: string,
}


export default class RandomPassword extends Component<Props, State> {

  state = {
    password: '',
  }

  private generatePassword = (): void => {
    const formComp = this.refs['configForm'];
    const { characters, length } = ((formComp as any).getForm() as WrappedFormUtils).getFieldsValue() as FormConfig;
    let allowCharacters = [];
    if (characters.includes('ABC')) {
      allowCharacters = allowCharacters.concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    }
    if (characters.includes('abc')) {
      allowCharacters = allowCharacters.concat('abcdefghijklmnopqrstuvwxyz'.split(''));
    }
    if (characters.includes('123')) {
      allowCharacters = allowCharacters.concat('01234567890'.split(''));
    }
    if (characters.includes('!#$')) {
      allowCharacters = allowCharacters.concat('!@#$%^&*()_+-'.split(''));
    }

    let password = '';
    if (allowCharacters.length > 0 && length > 0) {
      for (let i = 0; i < length; ++i) {
        password += allowCharacters[Math.floor(Math.random() * allowCharacters.length)];
      }
    }
    this.setState({ password });
  }

  private onChange = () => {
    this.generatePassword();
  }

  public componentDidMount() {
    this.generatePassword();
  }

  private renderPassword = (password: string) => {
    return (<div
      onClick={() => { copy(password); notification.success({ message: 'Password Copied!' }) }}
      className={styles.password}>{password}
    </div>);
  }

  render() {
    const { } = this.props;
    const { password } = this.state;
    return (
      <div className={styles.main}>
        <h2>Random Password Generator</h2>
        <WrappedPasswordConfigForm onChange={this.onChange} ref="configForm" />
        <Button type="primary" onClick={this.generatePassword}>Re-generate</Button>
        {this.renderPassword(password)}
      </div>
    );
  }

}

