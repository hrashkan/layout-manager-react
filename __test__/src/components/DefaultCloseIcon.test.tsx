import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DefaultCloseIcon } from "../../../src/components/DefaultCloseIcon";

describe("DefaultCloseIcon", () => {
  it("renders an svg with default size and color", () => {
    render(<DefaultCloseIcon />);
    // svg has no implicit role; select directly
    const svgEl = document.querySelector("svg") as SVGSVGElement;
    expect(svgEl).toBeTruthy();
    expect(svgEl.getAttribute("width")).toBe("16");
    expect(svgEl.getAttribute("height")).toBe("16");
    expect(svgEl.getAttribute("stroke")).toBe("#666");
    // 2 lines to form an X
    const lines = svgEl.querySelectorAll("line");
    expect(lines.length).toBe(2);
    expect(lines[0].getAttribute("x1")).toBe("18");
    expect(lines[0].getAttribute("y1")).toBe("6");
    expect(lines[0].getAttribute("x2")).toBe("6");
    expect(lines[0].getAttribute("y2")).toBe("18");
  });

  it("applies custom size, color, and className", () => {
    render(
      <DefaultCloseIcon size={24} color="#123456" className="icon-test" />
    );
    const el = document.querySelector("svg") as SVGSVGElement;
    expect(el.getAttribute("width")).toBe("24");
    expect(el.getAttribute("height")).toBe("24");
    expect(el.getAttribute("stroke")).toBe("#123456");
    expect(el.classList.contains("icon-test")).toBe(true);
  });
});
