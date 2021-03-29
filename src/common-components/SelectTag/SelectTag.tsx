import React from 'react';
import PropTypes from 'prop-types';
import { Tag, WhiteTag } from './SelectTag.styles';

const SelectTag = ({ selected, onChange, children }) => {
  const TagComponent = selected ? Tag : WhiteTag;

  return (
    <TagComponent variant="rounded" height={36} onClick={onChange}>
      {children}
    </TagComponent>
  );
};

SelectTag.propTypes = {
  onChange: PropTypes.func,
  selected: PropTypes.bool,
  children: PropTypes.string,
};

SelectTag.defaultProps = {
  onChange: () => {},
  selected: false,
  children: null,
};

export default SelectTag;
