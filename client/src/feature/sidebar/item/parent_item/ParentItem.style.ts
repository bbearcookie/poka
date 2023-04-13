import styled from "styled-components";
import { StyledItemList } from "../item_list/ItemList.style";
import { StyledItem } from "../item/Item.style";

export const StyledParentItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 0;

  ${StyledItemList} ${StyledItem} {
    padding-left: 2.5em;
  }
`;