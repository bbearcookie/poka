import React from 'react';
import classNames from 'classnames';
import './Table.scss'

// 테이블 컴포넌트 ==================
interface TableProps {
  className?: string;
  children?: React.ReactNode;
}

const TableDefaultProps = {};

function Table({ className, children }: TableProps & typeof TableDefaultProps) {
  return (
    <article className="Table_wrapper">
      <table className={classNames("Table", className)}>
        {children}
      </table>
    </article>
  );
}

Table.defaultProps = TableDefaultProps;

export default Table;