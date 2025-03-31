# Laser Simulator
This project serves as a base for a future laser simulator that can be used to test and examine control methods that correct laser properties that drift with time. It can serve as a low-cost testing gate to expose more basic failures earlier in the process.

In this proof of concept, the trajectory of a cooled Ytterbium ion is modeled as a random walk in three dimensional space with a drift in the z-direction. A laser, on the z-axis, is emitting an electromagnetic wave in the direction of the ion. As the ion drifts along the z-axis, its perception of the frequency of the laser changes according to the Doppler effect. To maintain the correct frequency needed for cooling the ion with the laser, a simple PID controller adjusts the frequency of the laser to remain at the target frequency needed for cooling.

<img width="871" alt="Screenshot 2025-03-30 at 22 20 56" src="https://github.com/user-attachments/assets/5ef15eb3-1e28-41c9-ab7e-a865677b2a85" />

### Key Components
* Ytterbium Ion - simulates the trajectory of the ion at low temperatures using a random walk with a parameterized drift
* Laser - generates an EM wave propagating toward the ion, with measured electric field values
* PID Controller - adjusts the frequency of the laser to compensate for the Doppler Shift that occurs as the ion drifts toward/away from the laser

### Laser Properties Susceptible to Drift
1. Frequency
   * Causes:
     * Vibrations can slightly modify the dimensions of the laser cavity, which will change the resonant frequency of that cavity which will result in a change in the output frequency
     * Temperature fluctuations will modify the index of refraction of the air, changing the wavelength. A change in temperature can change the index of refraction of the components of the laser, which changes the electrical length of the laser cavity, which will result in a different frequency
   * Impact:
     * Inability to match resonant frequency of Ytterbium ion needed to change energy state
     * Inability to achieve the target frequency slightly below the natural resonance of Ytterbium ions for Doppler cooling
2. Power
   * Causes:
     * Variations in the components of the rectifiers, clampers, and clippers in the power supply
     * Any impedance mismatches in high frequency components in the laser
   * Impact:
     * Inability to modify and read energy states of Ytterbium ion


### Improvements
* This simulation would only apply once the ion has already been cooled to near zero Kelvin. Otherwise, the velocity of the ion would be too great to accommodate the measurement and computation time needed in this process.
* The measurement of the distance between the ion and the laser may alter the velocity of the ion. Perhaps this can be anticipated. 
* Does this offer a significant advantage over red-detuning by a constant amount?
* PID Controller is very simple and it may be worth considering how the PID controller would interact with the PHD system
* The proportional, integral, and derivative coefficients are constants. There are many interesting options for tuning these parameters using machine learning
