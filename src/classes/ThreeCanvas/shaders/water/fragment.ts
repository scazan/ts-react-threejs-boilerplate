export default `
  #ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform sampler2D texture0;

varying vec2 v_texcoord;

#define NUM_OCTAVES 5

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}


void main(void)
{
    vec2 uv = vec2(v_texcoord);
    uv.y = 1.0 - uv.y;

    float strength = smoothstep(0.0, 1.0, uv.y) * 1.0;
    vec2 surface = strength * vec2(
        mix(-0.3, 0.3, fbm(1. * uv + (0.5 * time))), 
        fbm(4.0 * uv + (0.5 * time))
    );

    uv *= refract(vec2(1.,2.), surface, 1./1.3333);
    vec4 color = texture2D(texture0, uv);

    gl_FragColor = color;
}
`;
