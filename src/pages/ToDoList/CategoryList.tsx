import React from "react";
import { useRecoilState } from "recoil";
import { Categories, categoryState, TODO_CATEGORY_OPTION } from "../../atom";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    // =========== To get different select option data ===========
    setCategoryList(event.currentTarget.value as Categories);

    // =========== Set default select option ===========
    localStorage.setItem(
      TODO_CATEGORY_OPTION,
      JSON.stringify(event.currentTarget.value)
    );
  };

  return (
    <select value={categoryList} onInput={onInput}>
      <option value={Categories.TO_DO}>To Do</option>
      <option value={Categories.DOING}>Doing</option>
      <option value={Categories.DONE}>Done</option>
    </select>
  );
};

export default CategoryList;
