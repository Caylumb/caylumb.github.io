import { Spherical, Vector3 } from 'three';

// Helper: Convert a 3D position (Cartesian) to spherical coordinates (radius, phi, theta)
export const cartesianToSpherical = (position: Vector3) => {
  const spherical = new Spherical();
  spherical.setFromVector3(position);
  return spherical;
};

// Helper: Convert spherical coordinates back to a 3D position (Cartesian)
export const sphericalToCartesian = (spherical: Spherical) => {
  const vector = new Vector3();
  vector.setFromSpherical(spherical);
  return vector;
};

export const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
