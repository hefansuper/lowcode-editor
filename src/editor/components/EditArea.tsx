/*
 * @Author: stephenHe
 * @Date: 2025-01-15 16:30:40
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-01-15 18:12:28
 * @Description:
 * @FilePath: /lowcode-editor/src/editor/components/EditArea.tsx
 */
import { useEffect } from "react";
import { useComponentsStore } from "../stores/components";


export function EditArea() {

  const { components, addComponent } = useComponentsStore();

  useEffect(() => {
    // addComponent(
    //   {
    //     id: 222,
    //     name: "Container",
    //     props: {},
    //     children: [],
    //   },
    //   1
    // );

    addComponent(
      {
        id: 333,
        name: "Video",
        props: {},
        children: [],
      },
      222
    );
  }, [addComponent]);

  return (
    <div>
      <pre>{JSON.stringify(components, null, 2)}</pre>
    </div>
  );
}
