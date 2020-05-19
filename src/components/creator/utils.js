const partOrder = [
  'leftOutsideAccessory',
  'leftOutsideArm',
  'leftFace',
  'leftInsideArm',
  'leftCheek',
  'leftEye',
  'mouth',
  'nose',
  'rightEye',
  'rightCheek',
  'rightInsideArm',
  'rightFace',
  'rightOutsideArm',
  'rightOutsideAccessory',
];

export function getEmpty() {
  return {
    leftOutsideAccessory: null,
    leftOutsideArm: null,
    leftFace: null,
    leftInsideArm: null,
    leftCheek: null,
    leftEye: null,
    mouth: null,
    nose: null,
    rightEye: null,
    rightCheek: null,
    rightInsideArm: null,
    rightFace: null,
    rightOutsideArm: null,
    rightOutsideAccessory: null,
  };
}

// todo: remove?
export function removeParts(creation, propList) {
  const copy = { ...creation };
  for (const prop of propList) {
    copy[prop] = null;
  }
  return copy;
}

export function ignoreParts(creation, propList) {
  const copy = { ...creation };
  for (const prop of propList) {
    delete copy[prop];
  }
  return copy;
}

export function assign(creation, ...parts) {
  return Object.assign({}, creation, ...parts);
}

export function format(creation) {
  return partOrder.map((part) => creation[part] || '').join('');
}

export function getSideProps(side, props) {
  return props.filter((prop) => prop.startsWith(side));
}

export function hasSideProps(side, part) {
  return (
    getSideProps(side, Object.keys(part)).filter((key) => part[key] != null)
      .length > 0
  );
}

export function hasSomeSpecificPart(creation, part, props) {
  return props.some(
    (prop) => part[prop] != null && part[prop] === creation[prop],
  );
}
