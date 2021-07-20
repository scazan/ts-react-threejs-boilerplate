varying vec2 vUv;
uniform float time;

void main()
{
    float opacity = pow(distance(vUv, vec2(1)), 5.0);
    // gl_FragColor = vec4(vec3(0.0), opacity * 0.08);
    gl_FragColor = vec4(vec3(0.0), opacity * 0.08);
}
