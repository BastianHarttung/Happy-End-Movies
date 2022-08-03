import React from "react"


interface IProgressRingProps {
  progress: number;
  radius?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  fontColor?: string;
  labelSize?: string;
}

const VotingRing = ({
                        progress,
                        radius = 40,
                        strokeWidth = 6,
                        strokeColor,
                        fillColor = "#000000",
                        fontColor,
                        labelSize,
                        ...restProps
                      }: IProgressRingProps) => {
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  function invertHexColor(hex: string, bw: boolean) {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }
    let r: number | string = parseInt(hex.slice(0, 2), 16),
      g: number | string = parseInt(hex.slice(2, 4), 16),
      b: number | string = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      // https://stackoverflow.com/a/3943023/112731
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);

    // pad each with zeros and return
    function padZero(str: string, len = 2) {
      const zeros = new Array(len).join("0");
      return (zeros + str).slice(-len);
    }

    return "#" + padZero(r) + padZero(g) + padZero(b);
  }

  const changingStrokeColor = `hsl(${progress}, 90%, 50%)`;
  const changingSmallStrokeColor = `hsl(${progress}, 70%, 85%)`;

  const styleContainer: React.CSSProperties = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: `${radius * 2}px`,
    width: `${radius * 2}px`
  }
  const stylesNumber: React.CSSProperties = {
    color: `${fontColor ? fontColor : invertHexColor(fillColor, true)}`,
    position: "absolute",
    // inset: "0",
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: `${!!labelSize ? labelSize : radius / 2.1 + "px"}`,
    fontWeight: 500
  };
  const styleSvg = {
    transform: "rotate(-90deg)",
    filter: "drop-shadow(0px 3px 5px rgb(0 0 0 / 0.2)) drop-shadow(-1px 1px 3px rgb(0 0 0 / 0.4))",
  };

  return (
    <div style={styleContainer} {...restProps}>
      <svg height={radius * 2} width={radius * 2} style={styleSvg}>
        <circle
          stroke={strokeColor ? strokeColor : changingSmallStrokeColor}
          fill={fillColor}
          strokeWidth={strokeWidth / 2}
          strokeDasharray={circumference + " " + circumference}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          rotate={90}
        />
        <circle
          stroke={strokeColor ? strokeColor : changingStrokeColor}
          fill={fillColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + " " + circumference}
          style={{
            strokeDashoffset,
            animation: "all 1s"
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          rotate={90}
        />
      </svg>
      <div style={stylesNumber}>{progress}%</div>
    </div>
  );
};

export default VotingRing;
