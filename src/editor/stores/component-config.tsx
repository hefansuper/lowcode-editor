/*
 * @Author: stephenHe
 * @Date: 2025-01-16 10:48:01
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-01-16 10:49:19
 * @Description: json中的name 对应 实际前端组件 映射，相当于一个大的map
 *  name -> 实际组件，在实际render时，根据name找到对应的组件
 * @FilePath: /lowcode-editor/src/editor/stores/component-config.tsx
 */

import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component: any;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: "Container",
      defaultProps: {},
      component: Container,
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      component: Button,
    },
  },
  // 注册组件，相当于往componentConfig中添加一条映射关系，相当于add
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
