import math
import os
import subprocess
import shutil

OUTPUT_DIR = "/tmp/aria_frames"
if os.path.exists(OUTPUT_DIR):
    shutil.rmtree(OUTPUT_DIR)
os.makedirs(OUTPUT_DIR, exist_ok=True)

TOTAL_SECONDS = 7.0
FPS = 24
TOTAL_FRAMES = int(TOTAL_SECONDS * FPS)

def clamp(val, min_v, max_v):
    return max(min_v, min(val, max_v))

def lerp(a, b, t):
    return a + (b - a) * t

def smoothstep(edge0, edge1, x):
    t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)

for i in range(TOTAL_FRAMES):
    time = i / FPS  # 0.0 to 7.0
    
    # Phase calculations:
    # 0.0 -> 1.5: Looking right (head_turn ~ 0.8)
    # 1.5 -> 3.2: Turn towards front (head_turn 0.8 -> 0.0)
    # 3.2 -> 4.5: Center, blink at 3.6 - 4.1
    # 4.5 -> 5.8: Arm crossing begins
    # 5.8 -> 7.0: Arms fully crossed, confident pose
    
    # Head turn: 1.0 is full right-facing, 0.0 is center
    if time < 1.0:
        head_turn = 0.75 + 0.05 * math.sin(time * 2.0)
        smile = 0.35 + 0.05 * math.sin(time * 3.0)
        blink = 0.0
        arms_up = 0.0
    elif time < 3.2:
        t = smoothstep(1.0, 3.2, time)
        head_turn = lerp(0.75, 0.0, t)
        smile = lerp(0.35, 0.7, t)
        blink = 0.0
        arms_up = 0.0
    elif time < 4.6:
        head_turn = 0.0 + 0.02 * math.sin((time - 3.2) * 3.0)
        smile = 0.7 + 0.1 * math.sin((time - 3.2) * 2.0)
        # Blink peak at 3.9
        if 3.6 <= time <= 4.2:
            blink_t = (time - 3.6) / 0.6
            blink = math.sin(blink_t * math.pi)
        else:
            blink = 0.0
        arms_up = 0.0
    elif time < 5.8:
        t = smoothstep(4.6, 5.8, time)
        head_turn = 0.0 - 0.03 * math.sin(t * math.pi)
        smile = lerp(0.7, 0.9, t)
        blink = 0.0
        arms_up = t
    else:
        head_turn = 0.0 + 0.01 * math.sin((time - 5.8) * 1.5)
        smile = 0.9 + 0.05 * math.sin((time - 5.8) * 2.0)
        blink = 0.0
        arms_up = 1.0

    # Geometry coordinates
    center_x = 580 + head_turn * 35  # Shift slightly right when looking right
    center_y = 290
    
    # Eye tracking:
    # When head_turn is high, pupils shift right
    pupil_offset_x = lerp(0.0, 8.0, head_turn)
    pupil_scale_y = clamp(1.0 - blink * 0.95, 0.05, 1.0)
    eyelid_y = 240 + blink * 16

    # Arm fold progress
    arm_offset_y = (1.0 - arms_up) * 180

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
  <defs>
    <radialGradient id="bg" cx="62%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#a4bccd"/>
      <stop offset="60%" stop-color="#8ba1b1"/>
      <stop offset="100%" stop-color="#738999"/>
    </radialGradient>
    <linearGradient id="hoodieGrad" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#697179"/>
      <stop offset="50%" stop-color="#4e555b"/>
      <stop offset="100%" stop-color="#3b4146"/>
    </linearGradient>
    <linearGradient id="hoodieArm" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5a6167"/>
      <stop offset="100%" stop-color="#3c4146"/>
    </linearGradient>
    <linearGradient id="skin" x1="30%" y1="10%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#ffe2cf"/>
      <stop offset="60%" stop-color="#f5c4a6"/>
      <stop offset="100%" stop-color="#dfa483"/>
    </linearGradient>
    <linearGradient id="hairDark" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#78472a"/>
      <stop offset="50%" stop-color="#542e18"/>
      <stop offset="100%" stop-color="#381d0d"/>
    </linearGradient>
    <linearGradient id="hairLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#995e38"/>
      <stop offset="70%" stop-color="#6d3d20"/>
      <stop offset="100%" stop-color="#4a2612"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="15" flood-color="#23313d" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bg)"/>

  <!-- Character Group -->
  <g id="character" filter="url(#softShadow)">
    
    <!-- Body / Torso / Hoodie Base -->
    <path d="M 410 420 C 440 370 480 355 580 355 C 680 355 720 370 750 420 L 780 540 L 380 540 Z" fill="url(#hoodieGrad)"/>
    
    <!-- Inner collar / undershirt -->
    <polygon points="555,350 605,350 590,395 570,395" fill="#c49a6c"/>

    <!-- Hoodie Neck Line & Ribbing -->
    <path d="M 525 352 Q 580 385 635 352 Q 620 405 580 408 Q 540 405 525 352 Z" fill="#444b51"/>

    <!-- Drawstrings -->
    <path d="M 545 375 Q 542 430 538 465" stroke="#a07a50" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <rect x="535" y="465" width="6" height="12" rx="3" fill="#755230"/>
    <path d="M 615 375 Q 618 430 622 465" stroke="#a07a50" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <rect x="619" y="465" width="6" height="12" rx="3" fill="#755230"/>

    <!-- Neck -->
    <rect x="{center_x - 30}" y="300" width="60" height="60" rx="20" fill="url(#skin)"/>
    <!-- Neck shadow -->
    <path d="M {center_x - 30} 325 Q {center_x} 345 {center_x + 30} 325 L {center_x + 30} 305 L {center_x - 30} 305 Z" fill="#cf9574" opacity="0.45"/>

    <!-- Ears -->
    <ellipse cx="{center_x - 72 + head_turn * 15}" cy="245" rx="16" ry="24" transform="rotate(-8 {center_x - 72} 245)" fill="url(#skin)"/>
    <ellipse cx="{center_x - 72 + head_turn * 15}" cy="245" rx="9" ry="14" fill="#df9c7c" opacity="0.6"/>
    <ellipse cx="{center_x + 72 + head_turn * 15}" cy="245" rx="16" ry="24" transform="rotate(8 {center_x + 72} 245)" fill="url(#skin)"/>
    <ellipse cx="{center_x + 72 + head_turn * 15}" cy="245" rx="9" ry="14" fill="#df9c7c" opacity="0.6"/>

    <!-- Head / Face -->
    <g transform="translate({head_turn * 15}, 0)">
      <!-- Jaw / Face shape -->
      <path d="M {center_x - 65} 210 C {center_x - 70} 275 {center_x - 45} 320 {center_x} 325 C {center_x + 45} 320 {center_x + 70} 275 {center_x + 65} 210 C {center_x + 60} 145 {center_x - 60} 145 {center_x - 65} 210 Z" fill="url(#skin)"/>

      <!-- Cheeks blush -->
      <ellipse cx="{center_x - 38 + head_turn * 10}" cy="256" rx="18" ry="10" fill="#e88f72" opacity="0.32"/>
      <ellipse cx="{center_x + 38 + head_turn * 10}" cy="256" rx="18" ry="10" fill="#e88f72" opacity="0.32"/>

      <!-- Freckles -->
      <circle cx="{center_x - 22 + head_turn * 8}" cy="254" r="1.5" fill="#a8684a" opacity="0.45"/>
      <circle cx="{center_x - 14 + head_turn * 8}" cy="252" r="1.3" fill="#a8684a" opacity="0.4"/>
      <circle cx="{center_x - 28 + head_turn * 8}" cy="258" r="1.4" fill="#a8684a" opacity="0.4"/>
      <circle cx="{center_x + 18 + head_turn * 8}" cy="253" r="1.5" fill="#a8684a" opacity="0.45"/>
      <circle cx="{center_x + 26 + head_turn * 8}" cy="257" r="1.3" fill="#a8684a" opacity="0.4"/>
      <circle cx="{center_x + 10 + head_turn * 8}" cy="251" r="1.4" fill="#a8684a" opacity="0.4"/>

      <!-- Nose -->
      <path d="M {center_x + head_turn * 12} 228 Q {center_x + 1 + head_turn * 12} 252 {center_x - 6 + head_turn * 12} 255 Q {center_x + head_turn * 12} 258 {center_x + 7 + head_turn * 12} 255" fill="none" stroke="#ba7453" stroke-width="2.6" stroke-linecap="round"/>

      <!-- Left Eye -->
      <g transform="translate({center_x - 32 + head_turn * 10}, 232)">
        <ellipse cx="0" cy="0" rx="15" ry="{12 * pupil_scale_y}" fill="#ffffff"/>
        <!-- Iris -->
        <circle cx="{clamp(pupil_offset_x - 2, -6, 6)}" cy="0" r="{7 * pupil_scale_y}" fill="#522a16"/>
        <!-- Pupil -->
        <circle cx="{clamp(pupil_offset_x - 2, -6, 6)}" cy="0" r="{4 * pupil_scale_y}" fill="#180b05"/>
        <!-- Highlights -->
        <circle cx="{clamp(pupil_offset_x - 4, -8, 4)}" cy="-3" r="2.2" fill="#ffffff" opacity="{pupil_scale_y}"/>
        <circle cx="{clamp(pupil_offset_x, -4, 8)}" cy="2" r="1.1" fill="#ffffff" opacity="{pupil_scale_y}"/>
        <!-- Upper Eyelid / Lash -->
        <path d="M -16 -4 Q 0 -15 16 -4" stroke="#3b1b0e" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      </g>

      <!-- Right Eye -->
      <g transform="translate({center_x + 32 + head_turn * 10}, 232)">
        <ellipse cx="0" cy="0" rx="15" ry="{12 * pupil_scale_y}" fill="#ffffff"/>
        <!-- Iris -->
        <circle cx="{clamp(pupil_offset_x + 2, -6, 6)}" cy="0" r="{7 * pupil_scale_y}" fill="#522a16"/>
        <!-- Pupil -->
        <circle cx="{clamp(pupil_offset_x + 2, -6, 6)}" cy="0" r="{4 * pupil_scale_y}" fill="#180b05"/>
        <!-- Highlights -->
        <circle cx="{clamp(pupil_offset_x, -8, 4)}" cy="-3" r="2.2" fill="#ffffff" opacity="{pupil_scale_y}"/>
        <circle cx="{clamp(pupil_offset_x + 4, -4, 8)}" cy="2" r="1.1" fill="#ffffff" opacity="{pupil_scale_y}"/>
        <!-- Upper Eyelid / Lash -->
        <path d="M -16 -4 Q 0 -15 16 -4" stroke="#3b1b0e" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      </g>

      <!-- Eyebrows -->
      <!-- Left Brow -->
      <path d="M {center_x - 50 + head_turn * 10} {212 - smile * 3} Q {center_x - 30 + head_turn * 10} {204 - smile * 4} {center_x - 14 + head_turn * 10} 214" stroke="#3d2113" stroke-width="4.2" stroke-linecap="round" fill="none"/>
      <!-- Right Brow -->
      <path d="M {center_x + 14 + head_turn * 10} 214 Q {center_x + 30 + head_turn * 10} {204 - smile * 5} {center_x + 50 + head_turn * 10} {212 - smile * 3}" stroke="#3d2113" stroke-width="4.2" stroke-linecap="round" fill="none"/>

      <!-- Mouth -->
      <g transform="translate({center_x + head_turn * 10}, 282)">
        <!-- Smile Curve -->
        <path d="M -22 {-1 + smile * 2} Q 0 {10 + smile * 8} 24 {-1 + smile * 2}" stroke="#7d3b24" stroke-width="3" stroke-linecap="round" fill="#8f3e26"/>
        <!-- Teeth -->
        <path d="M -14 {1 + smile * 2} Q 0 {6 + smile * 3} 16 {1 + smile * 2} Z" fill="#ffffff" opacity="{smile > 0.6 and '0.9' or '0.0'}"/>
      </g>
    </g>

    <!-- Hair (Curled 3D locks surrounding head) -->
    <g id="hair" transform="translate({head_turn * 8}, 0)">
      <!-- Back hair volume -->
      <path d="M {center_x - 85} 220 C {center_x - 105} 150 {center_x - 70} 110 {center_x} 105 C {center_x + 70} 110 {center_x + 105} 150 {center_x + 85} 220 C {center_x + 95} 170 {center_x - 95} 170 {center_x - 85} 220 Z" fill="url(#hairDark)"/>
      
      <!-- Thick textured curl clusters -->
      <circle cx="{center_x - 65}" cy="165" r="26" fill="url(#hairLight)"/>
      <circle cx="{center_x - 45}" cy="135" r="30" fill="url(#hairDark)"/>
      <circle cx="{center_x - 10}" cy="122" r="34" fill="url(#hairLight)"/>
      <circle cx="{center_x + 30}" cy="126" r="32" fill="url(#hairDark)"/>
      <circle cx="{center_x + 65}" cy="150" r="28" fill="url(#hairLight)"/>
      <circle cx="{center_x + 75}" cy="185" r="22" fill="url(#hairDark)"/>

      <!-- Front curly bangs / tufts -->
      <path d="M {center_x - 60} 185 C {center_x - 70} 150 {center_x - 20} 145 {center_x - 15} 180 C {center_x} 145 {center_x + 40} 145 {center_x + 35} 185 C {center_x + 45} 160 {center_x + 75} 175 {center_x + 60} 205 C {center_x + 50} 190 {center_x - 50} 190 {center_x - 60} 185 Z" fill="url(#hairLight)"/>
      <path d="M {center_x - 25} 175 Q {center_x - 5} 195 {center_x - 15} 208 Q {center_x - 30} 195 {center_x - 25} 175 Z" fill="url(#hairDark)"/>
      <path d="M {center_x + 10} 178 Q {center_x + 25} 198 {center_x + 15} 210 Q {center_x} 195 {center_x + 10} 178 Z" fill="url(#hairLight)"/>
      <path d="M {center_x + 35} 182 Q {center_x + 50} 200 {center_x + 42} 212 Q {center_x + 28} 198 {center_x + 35} 182 Z" fill="url(#hairDark)"/>
    </g>

    <!-- Folded Arms (Phase 2: slide up smoothly and fold across chest) -->
    <g id="foldedArms" transform="translate(0, {arm_offset_y})">
      <!-- Right Arm (viewer left) -->
      <path d="M 400 520 C 420 460 490 440 590 450 C 640 455 670 475 660 515 C 645 540 570 535 500 535 C 440 535 410 535 400 520 Z" fill="url(#hoodieArm)" stroke="#32373c" stroke-width="2"/>
      <!-- Left Arm (viewer right, crossing over) -->
      <path d="M 760 520 C 740 455 660 435 560 445 C 500 450 460 480 475 518 C 495 545 580 540 660 540 C 720 540 750 535 760 520 Z" fill="url(#hoodieGrad)" stroke="#32373c" stroke-width="2"/>
      <!-- Sleeve cuffs & fabric seams -->
      <ellipse cx="495" cy="510" rx="20" ry="10" fill="#464d53" transform="rotate(-15 495 510)"/>
      <ellipse cx="660" cy="505" rx="20" ry="10" fill="#464d53" transform="rotate(15 660 505)"/>
      <!-- Hand hints tucked inside -->
      <path d="M 470 500 Q 455 495 450 510 Q 460 520 475 515 Z" fill="url(#skin)"/>
      <path d="M 685 495 Q 700 490 705 505 Q 695 515 680 510 Z" fill="url(#skin)"/>
    </g>

  </g>

  <!-- Veo Watermark badge bottom-right -->
  <g transform="translate(900, 508)">
    <text font-family="'Helvetica Neue', Arial, sans-serif" font-size="14" font-weight="600" fill="#ffffff" fill-opacity="0.7" text-anchor="middle" letter-spacing="0.5">Veo</text>
  </g>
</svg>'''

    frame_path = f"{OUTPUT_DIR}/frame_{i:04d}.svg"
    with open(frame_path, "w") as f:
        f.write(svg)

print(f"Generated {TOTAL_FRAMES} frames in {OUTPUT_DIR}")
