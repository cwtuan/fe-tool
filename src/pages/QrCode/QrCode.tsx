import React, { Component, ChangeEvent } from 'react';
import { FormComponentProps } from "antd/lib/form/Form";
import { Input } from 'antd';
const styles = require("./QrCode.less");
import QRCode from 'qrcode';

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
      const qrCodeData: string = await QRCode.toDataURL(text, { scale: 10 });
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
        <h2>Input Text to Generate QR Code:</h2>
        <Input className="mgb10" defaultValue={text} allowClear onChange={this.onTextChange} />
        {!!qrCodeData && <img className={styles.qrCodeImg} src={qrCodeData} />}
      </div>
    );
  }
}

