import isArray from 'lodash.isarray';
import forEach from 'lodash.foreach';

/* eslint-disable no-underscore-dangle */
const _replaceMemberDetails = (family, member) => {
  if (family.id === member.id) {
    Object.assign(family, member);
  } else if (isArray(family.children)) {
    forEach(family.children, (child) => {
      _replaceMemberDetails(child, member);
    });
  }
};
/* eslint-enable no-underscore-dangle */

export const updateFamily = (family, member) => {
  _replaceMemberDetails(family, member);
  return family;
};

/**
 * default export of helper methods
 */
export default {
  updateFamily,
};
