/*
 * @Author: stephenHe
 * @Date: 2025-01-15 21:19:28
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-01-15 21:19:39
 * @Description: Button
 * @FilePath: /lowcode-editor/src/editor/materials/Button/index.tsx
 */
import { Button as AntdButton } from "antd";
import { ButtonType } from "antd/es/button";

export interface ButtonProps {
  type: ButtonType;
  text: string;
}

const Button = ({ type, text }: ButtonProps) => {
  return <AntdButton type={type}>{text}</AntdButton>;
};

export default Button;
