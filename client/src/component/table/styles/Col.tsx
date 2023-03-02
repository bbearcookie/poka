import styled from "styled-components";

interface Props {
  width?: string;
}

const Col = styled.col<Props>`
  width: ${p => p.width};
`

export default Col;