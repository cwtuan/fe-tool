import React, { Component, ChangeEvent } from 'react';
// import { connect } from 'dva';
// import { formatMessage, FormattedMessage } from 'umi/locale';
// import Link from 'umi/link';
import { FormComponentProps } from "antd/lib/form/Form";
import { Form, Input } from 'antd';
// import styles from './QrCode.less';
const styles = require("./QrCode.less");
const FormItem = Form.Item;
import QRCode from 'qrcode';
import { debug } from 'util';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

interface Props extends FormComponentProps {

}

interface State {
  text: string;
  qrCodeData: string;
}



// @Form.create()
export default class QrCode extends Component<Props, State> {

  state = {
    text: 'Please Input Text',
    qrCodeData: null,
  }

  private onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('text', e.target.value);
    this.setState({ text: e.target.value }, () => {
      this.generateQR();
    });
  }

  private generateQR = async () => {
    const { text } = this.state;
    if (!text) {
      this.setState({ qrCodeData: null });
      return;
    }
    try {
      const qrCodeData: string = await QRCode.toDataURL(text);
      this.setState({ qrCodeData });
    } catch (err) {
      console.error(err)
    }
  }

  public componentDidMount() {
    this.generateQR();
  }


  render() {
    const { } = this.props;
    const { text, qrCodeData } = this.state;
    return (
      <div className={styles.main}>
        请输入文字，将会产生二维码(QR Code)：
        <Input defaultValue={text} allowClear onChange={this.onTextChange} />
        {!!qrCodeData && <img className={styles.qrCodeImg} src={qrCodeData} />}
      </div>
    );
  }
}

