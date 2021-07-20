varying vec2 v_texcoord;
uniform float time;

void main() {
  v_texcoord = uv;

  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}
