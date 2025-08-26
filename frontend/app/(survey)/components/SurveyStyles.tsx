import { StyleSheet } from "react-native";
import { scaleW, scaleH, font } from "../../../utils/scale";

const SurveyStyles = StyleSheet.create({   
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  q: {
    marginLeft: -scaleW(163),
    top: scaleH(77),
    fontSize: font(20),
    fontWeight: "700",
    color: "#000",
    height: scaleH(82),
    width: scaleW(326),
    textAlign: "center",
    fontFamily: "Pretendard",
    lineHeight: scaleH(24),
    left: "50%",
    position: "absolute",
  },
  groupParent: {
    marginTop: -scaleH(232),
    marginLeft: -scaleW(164),
    top: "50%",
    height: scaleH(504),
    width: scaleW(328),
    left: "50%",
    position: "absolute",
  },
  optionBox: {
    height: scaleH(48),
    width: scaleW(326),
    borderRadius: scaleW(16),
    borderWidth: 2,
    borderColor: "#94a3b8",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  optionBoxSelected: {
    height: scaleH(48),
    width: scaleW(326),
    borderRadius: scaleW(16),
    backgroundColor: "#007aff",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  optionText: {
    fontSize: font(15),
    fontWeight: "500",
    color: "#1e1e1e",
    textAlign: "center",
    fontFamily: "Pretendard",
    lineHeight: scaleH(24),
    position: "absolute",
    left: "50%",
  },
  optionTextSelected: {
    fontSize: font(15),
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Pretendard",
    lineHeight: scaleH(24),
    position: "absolute",
    left: "50%",
  },
  c: { 
    marginLeft: -scaleW(156), 
    top: scaleH(8), 
    width: scaleW(310) 
  },
  d: { 
    marginLeft: -scaleW(155), 
    top: scaleH(8), 
    width: scaleW(310) 
  },
  a: { 
    marginLeft: -scaleW(153.5), 
    top: scaleH(8), 
    width: scaleW(307) 
  },
  rectangleParent: { 
    top: scaleH(391), 
    width: scaleW(324) 
  },
  rectangleGroup: { 
    top: scaleH(176) 
  },
  rectangleContainer: { 
    top: scaleH(249) 
  },
  essentialAirportSvg: {
    marginLeft: -scaleW(90),
    top: -scaleH(17),
    width: scaleW(180),
    height: scaleH(180),
    left: "50%",
    position: "absolute",
  },
  going: {
    position: "absolute",
    bottom: scaleH(50),
    left: "50%",
    marginLeft: -scaleW(32),
    height: scaleH(8),
    width: scaleW(65),
  },
  groupView: {
    flexDirection: "row",
    gap: scaleW(8),
    alignItems: "center",
  },
  dot: {
    width: scaleW(8),
    height: scaleW(8),
    borderRadius: 100,
    backgroundColor: "#8e8e93",
  },
  dotActive: {
    width: scaleW(32),
    height: scaleW(8),
    borderRadius: 100,
    backgroundColor: "#007aff",
  },
});

export { SurveyStyles };
export default SurveyStyles;