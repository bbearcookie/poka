import styled from 'styled-components';

// 포토카드 목록에서 보여줄 컴포넌트
export interface StylesPhotocardItemProps {
  backgroundColor?: string;
  border?: string;
  boxShadow?: string;
}
export const StylesPhotocardItem = styled.section<StylesPhotocardItemProps>`
  width: 12em;
  background-color: ${p => p.backgroundColor};
  border: ${p => p.border};
  border-radius: 10px;
  box-shadow: ${p => p.boxShadow || '0px 0px 10px 0px #c0c0c0'};

  .main {
    padding: 1.25em;

    .info-section {
      display: flex;
      margin-bottom: 0.5em;

      .member-section {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .group-name {
          width: fit-content;
          margin-top: 0.5em;
          padding: 0 0.4em;
          background-color: #e5e7eb;
          border-radius: 5px;
        }
      }

      .icon-section {
        align-self: flex-end;
      }
    }
  }

  .footer {
    padding: 1.25em;
    border-top: 1px solid #e5e7eb;
  }
`;

// 포토카드 이미지
export interface PhotoImgStyles {
  width?: string;
}
export const PhotoImg = styled.img<PhotoImgStyles>`
  width: ${p => p.width || '100%'};
  aspect-ratio: 214 / 322;
`;

// 포토카드 제목 부분
export const PhotoName = styled.div<{
  width?: string;
  margin?: string;
  boxSizing?: 'content-box' | 'border-box';
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${p => p.margin || '1em 0'};
  padding: 0 0.5em;
  width: ${p => p.width || '100%'};
  height: 3.5em;
  box-sizing: ${p => p.boxSizing || 'border-box'};
  border-radius: 5px;
  background-color: #242a38;
  color: white;

  .name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: center;
    word-break: keep-all;
    overflow: hidden;
  }
`;
