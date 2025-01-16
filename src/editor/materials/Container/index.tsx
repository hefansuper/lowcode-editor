/*
 * @Author: stephenHe
 * @Date: 2025-01-15 21:17:34
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-01-15 21:17:45
 * @Description: Container容器
 * @FilePath: /lowcode-editor/src/editor/materials/Container/index.tsx
 */
import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="border-[1px] border-[#000] min-h-[100px] p-[20px]">
      {children}
    </div>
  );
};

export default Container;
