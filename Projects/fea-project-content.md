# Finite Element Analysis Portfolio Project

## Recommended positioning

Present these four ME 328 labs as one cohesive project rather than four unrelated assignments.

**Suggested title:** Finite Element Analysis: Validation, Optimization, and Failure Modes

**Suggested subtitle:** SolidWorks Simulation studies covering mesh convergence, structural optimization, stress concentrations, and column buckling

**Core story:** I used analytical calculations to validate finite element models, investigated how modeling choices affected accuracy, and applied the verified models to make design decisions involving stiffness, material, geometry, weight, cost, and stability.

## Homepage project card

### Title

Finite Element Analysis Studies

### Short description

Validated SolidWorks finite element models against hand calculations, studied mesh convergence and boundary conditions, and applied the results to wing-spar optimization, stress-concentration analysis, and column buckling.

### Compact alternative

Four SolidWorks Simulation studies connecting analytical mechanics with mesh convergence, structural optimization, stress concentrations, and buckling.

### Suggested card label

FEA / SolidWorks Simulation

## Project-page hero copy

Finite element analysis is useful only when the model represents the real structure and its results can be defended. Across four ME 328 studies, I built and validated SolidWorks Simulation models, compared multiple element and boundary-condition choices, and used the verified results to evaluate structural performance. The work progressed from a simply supported beam to an aircraft wing spar, a filleted bar, and buckling columns.

## Recommended page structure

### 1. Modeling approach and validation

I began with a simply supported aluminum beam under uniform pressure. Analytical beam equations predicted a maximum bending stress of 54 kpsi and a maximum deflection of 15.3 in. I then modeled the beam with solid, shell, and beam elements while varying the boundary conditions and mesh size.

The study showed that boundary conditions mattered as much as mesh density. Fully fixing the end faces made the model artificially stiff, producing only 25.87 kpsi and 2.70 in of deflection. Constraining the support edges allowed the ends to rotate and produced 52.55 kpsi and 15.05 in with an 8 in solid-element mesh. Refining that mesh to 1 in converged to 54.02 kpsi and 15.32 in, closely matching the analytical solution.

Shell and beam models reached the same solution with fewer degrees of freedom. The result demonstrated why element selection, realistic fixtures, mesh convergence, and analytical checks are all necessary before trusting an FEA result.

**Key evidence**

- Analytical result: 54 kpsi maximum stress and 15.3 in maximum deflection.
- Over-constrained solid model: 25.87 kpsi and 2.70 in.
- Proper edge-supported solid model, 1 in mesh: 54.02 kpsi and 15.32 in.
- Shell model, 1 in mesh: 54.03 kpsi and 15.32 in.
- Beam model: approximately 54.00 kpsi and 15.31 in across the tested mesh sizes.

### 2. Wing-spar design optimization

After validating the modeling approach, I evaluated a 70 ft cantilever wing spar under a triangular lift distribution and a 500 lbf engine point load. I compared I-beam and hollow rectangular cross sections in 7075-T6 aluminum and normalized AISI 4130 steel. Each design was iterated until its tip deflection fell within the 9-10 in target range.

The 7075-T6 aluminum box beam was the strongest overall recommendation. It reached 9.378 in of tip deflection with a maximum stress of 3,259 psi, weighed 1,705 lb, and had an estimated material cost of $11,935. Among the four candidates, it was both the lightest and least expensive, while maintaining an estimated factor of safety of approximately 22.4 against yielding.

**Comparison data**

| Cross section | Material | Deflection | Maximum stress | Weight | Estimated cost |
| --- | --- | ---: | ---: | ---: | ---: |
| I-beam | 7075-T6 aluminum | 9.780 in | 4,760 psi | 1,969 lb | $13,783 |
| I-beam | AISI 4130 steel | 9.544 in | 13,325 psi | 2,596 lb | $25,960 |
| Box beam | 7075-T6 aluminum | 9.378 in | 3,259 psi | 1,705 lb | $11,935 |
| Box beam | AISI 4130 steel | 9.300 in | 6,694 psi | 3,335 lb | $33,350 |

### 3. Stress concentrations and geometry

I next studied a stepped, filleted bar under axial and bending loads. Solid-element models showed the peak von Mises stress forming at the geometric transition, where the cross section changed. Increasing the fillet radius made the transition more gradual and reduced the peak stress.

For the reported axial-loading cases, maximum stress decreased from 19.85 kpsi at a 0.2 in radius to 12.80 kpsi at a 16 in radius. For bending, it decreased from 29.56 kpsi to 20.24 kpsi. The results approached plateaus near 12.8 kpsi and 20.2 kpsi, respectively, showing diminishing returns as the fillet became larger. This connects simulation results to a practical design tradeoff between stress reduction, part geometry, and manufacturing cost.

**Important source check before publishing:** The Lab 3 narrative, results table, and handwritten appendices do not use one consistent pair of applied loads. Avoid publishing exact force and moment values until the original SolidWorks setup or assignment prompt confirms them. The stress trends and reported radius-versus-stress results are internally usable.

### 4. Buckling and boundary conditions

Finally, I used Euler buckling theory and SolidWorks eigenvalue buckling studies to size 6.5 ft balsa-wood columns. Four cases combined pinned-pinned and fixed-pinned supports with 22,500 lbf and 45,000 lbf compressive loads. Analytical calculations provided the initial cross-section dimensions, and I iterated each model until its simulated load factor fell within the required 2.5-2.6 safety-factor range.

The final square side lengths ranged from 4.75 in to 6.75 in, with simulated safety factors from 2.50 to 2.52. Fixed-pinned columns required smaller cross sections than pinned-pinned columns under the same load because the additional rotational restraint increased stiffness. Doubling the load increased the required side length by only about one inch because the square section's area moment of inertia scales with the fourth power of its side length.

**Final configurations**

| Boundary condition | Applied load | Final side length | Simulated safety factor |
| --- | ---: | ---: | ---: |
| Pinned-pinned | 22,500 lbf | 5.67 in | 2.50 |
| Fixed-pinned | 22,500 lbf | 4.75 in | 2.51 |
| Pinned-pinned | 45,000 lbf | 6.75 in | 2.52 |
| Fixed-pinned | 45,000 lbf | 5.70 in | 2.52 |

## Portfolio conclusion

These studies reinforced that FEA is not a substitute for engineering judgment. A solver will return a result even when fixtures, element types, or mesh choices do not represent the physical problem. By pairing simulation with analytical estimates, convergence checks, and design iteration, I was able to distinguish visually plausible results from defensible ones and use the models to make informed structural decisions.

## Skills demonstrated

- SolidWorks Simulation
- Static and eigenvalue buckling studies
- Solid, shell, and beam elements
- Boundary-condition selection
- Mesh refinement and convergence studies
- Hand-calculation validation
- von Mises stress and displacement interpretation
- Stress-concentration analysis
- Structural sizing and design iteration
- Material, weight, and cost trade studies
- Technical reporting

## Recommended visuals

Use cropped simulation results instead of full report pages whenever possible.

1. **Hero image:** Lab 3, page 3, Figure 4 - stress concentration at the 0.2 in fillet under axial loading. It is visually clear and immediately reads as FEA.
2. **Validation section:** Lab 1, page 3 or 4, Figures 2-4 - solid, shell, and beam stress contours.
3. **Convergence section:** Lab 1, page 5, Figures 5-6 - solid and shell convergence plots.
4. **Wing-spar section:** Lab 2, page 3, Figure 4 - triangular lift plus engine point-load diagram; pair with the comparison table from page 4.
5. **Stress-concentration section:** Lab 3, page 3, Figures 4-5 - axial and bending contours; optionally pair with the radius/stress table from page 4.
6. **Buckling section:** Lab 4, pages 3-5, Figures 2-5 - compare pinned-pinned and fixed-pinned mode shapes.
7. **Analytical validation:** Use one handwritten calculation selectively, preferably Lab 1 page 8-9 or Lab 4 page 7, to show that the simulations were checked rather than accepted blindly.

## Content cautions

- Do not present exaggerated deformation plots as physical-scale deformation unless clearly labeled; FEA software scales deformation for visibility.
- Describe the wing spar as a conceptual course design, not a production aircraft component.
- State that the wing-spar cost values are material estimates from the lab assumptions.
- Resolve the inconsistent Lab 3 load values before listing those loads publicly.
- Prefer “von Mises stress” over “vonMises stress” in website copy.
- Prefer “Euler buckling” over “Euler's theory equations.”
- Keep the reports available as supporting documentation, but lead with concise visuals and design decisions rather than embedding all 36 pages.

## Source map

- **Lab 1:** model setup, boundary conditions, element types, mesh convergence, and validation against beam calculations.
- **Lab 2:** cantilever wing-spar loading, cross-section/material trade study, and final recommendation.
- **Lab 3:** stress concentrations, fillet-radius sweep, and axial-versus-bending stress behavior.
- **Lab 4:** Euler buckling, eigenvalue buckling, end-condition effects, and safety-factor-driven sizing.
