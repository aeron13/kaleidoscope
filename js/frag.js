const frag = `
  #ifdef GL_ES
  precision highp float;
  #endif

	uniform sampler2D u_trails;
	uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  #define PI 3.1415
  #define SEGMENTS 12.0

	varying vec2 v_texcoord;

	void main(void) {
		vec2 uv = v_texcoord;

		uv *= 2.0;
    uv -= 1.0;

		// mouse position
		vec2 mouse = u_mouse / u_resolution;
    
    // coordinate polari: distanza dal centro (radius) e angolo
    
    float radius = length(uv) * mix(1.0, 2.0, mouse.x);
    float angle = atan(uv.y, uv.x);
    
    // get a segment
    angle /= PI;
    angle *= SEGMENTS;
    
    // repeat the segment
    // the segments go in alternate directions
    if (mod(angle, 2.0) >= 1.0) {
        angle = fract(angle);
    } else {
        angle = 1.0 - fract(angle);
    }
    
    // move the texture in time
    angle += u_time * 0.2;
    
    //unsquash texture
    angle /= SEGMENTS;
    angle *= PI;
   	angle += mouse.y;
    
    vec2 point = vec2(radius * cos(angle), radius * sin(angle));
    point = fract(point);
    
    vec4 color = texture2D(u_trails, point);

		gl_FragColor = color;
	}
`;