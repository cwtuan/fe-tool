import React, { Component } from 'react';
import { FormComponentProps, WrappedFormUtils } from "antd/lib/form/Form";
import { Form, notification, Button, Checkbox, InputNumber, Icon, Input } from 'antd';
import { formItemLayout } from '@/core/constants';
import copy from 'copy-to-clipboard';
import cx from 'classnames';
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
      <Form layout="horizontal" className="login-form" onChange={this.onChange}>
        <Form.Item
          {...formItemLayout}
          label="Password Length"
        >
          {getFieldDecorator('length', {
            initialValue: 32,
            rules: [{ required: true }],
          })(
            // Form下的InputNumber上下按钮改值时，不会触发Form的OnChange: https://github.com/ant-design/ant-design/issues/14771
            <InputNumber onChange={this.onChange}/>
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
  isRotating: boolean;
}


export default class RandomPassword extends Component<Props, State> {

  state = {
    isRotating: false,
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
    const { isRotating } = this.state;
    return (
      <div className={styles.passwordContainer}>
        <span>
          <Input value={password} className={styles.password}></Input>
          <Button
            className="mgl5 mgr5"
            // type="primary"
            onClick={() => {
              this.setState({ isRotating: true });
              setTimeout(() => {
                this.setState({ isRotating: false });
              }, 1000);
              this.generatePassword();
            }}
          >
            <Icon type="reload" className={cx({ rotate: isRotating })} />
            Re-generate
          </Button>
          <Button
            type="primary"
            onClick={() => {
              copy(password);
              notification.success({ message: 'Password Copied!' });
            }}
          >Copy</Button>
        </span>
      </div>
    );
  }

  render() {
    const { } = this.props;
    const { password } = this.state;
    return (
      <div className={styles.main}>
        <h1>Online Random Password Generator</h1>
        <div className={styles.content}>
          <WrappedPasswordConfigForm onChange={this.onChange} ref="configForm" />
          {this.renderPassword(password)}
        </div>
      </div>
    );
  }

}

