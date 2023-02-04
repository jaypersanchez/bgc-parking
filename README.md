# Overview

You were hired by XYZ Corp. to implement a parking allocation system for their new malling complex, the Object-Oriented Mall.
The new parking system will pre-assign a slot for every vehicle coming into the complex. No vehicle can freely choose a parking
slot and no vehicle is reserved or assigned a slot until they arrive at the entry point of the complex. The system must assign
a parking slot the satisfies the following constraints:

1. There are initially three (3) entry points, and can be no less than three (3), leading into the parking complex. A vehicle
  must be assigned a possible and available slot closest to the parking entrance. The mall can decide to add new entrances later.

2. There are three types of vehicles: small (S), medium (M) and large (L),
  and there are three types or parking slots: small (SP), medium (MP) and large (LP).

  (a) S vehicles can park in SP, MP and LP parking spaces;
  (b) M vehicles can park in MP and LP parking spaces; and
  (c) L vehicles can park only in LP parking spaces.

3. Your parking system must also handle the calculation of fees, and must meet the following pricing structure:

  (a) All types of car pay the flat rate of 40 pesos for the first three (3) hours;
  (b) The exceeding hourly rate beyond the initial three (3) hours will be charged as follows:

      - 20/hour for vehicles parked in SP;
      - 60/hour for vehicles parked in MP; and
      - 100/hour for vehicles parked in LP

      Take note that exceeding hours are charged depending on parking slot size regardless of vehicle size.

      For parking that exceeds 24 hours, every full 24 hour chunk is charged 5,000 pesos regardless of parking slot.
      The remainder hours are charged using the method explained in (b).

      Parking fees are calculated using rounding up method, e.g. 6.5 hours must be rounded to 7.

  (c) A vehicle leaving the parking complex and returning within one hour must be charged continuous rate,
      i.e. the vehicle must be considered as if it did not leave. Otherwise, rates must be implemented as described.

You are free to design the system in any pattern you wish. However, take note that the system assumes the input of the following:

  (a) The number of entry points to the parking complex, but no less than three (3). Assume that the entry points
      are also exit points, so no need to take into account the number of possible exit points.

  (b) The map of the parking slot. You are welcome to introduce a design that suits your approach. One suggested
      method, however, is to accept a list of tuples corresponding to the distance of each slot from every entry
      point. For example, if your parking system has three (3) entry points. The list of parking spaces may be
      the following: [(1,4,5), (3,2,3), ...], where the integer entry per tuple corresponds the distance unit
      from every parking entry points (A, B, C).

  (c) The sizes of every corresponding parking slot. Again, you are welcome to introduce your own design. We suggest using
      a list of corresponding sizes described in integers: [0, 2, 1, 1, ...] where 0, 1, 2 means small, medium and large
      in that order. Another useful design may be a dictionary of parking sizes with corresponding slots as values.

  (d) Two functions to park a vehicle and unpark it. The functions must consider the attributes of the vehicle as described above.
      When the unpark function is called, it must also return how much the vehicle concerned is charged.

# Use Case

![BGC Smart Parking System](./BGC%20Smart%20Parking%20System.png)

# Application User Guide

This section explains how the application is used.  A simulation of a vehicle is not implemented, therefore each screen represents a use case scenario.  There are three scenarios:

1. Arriving Vehicle
2. Returning Vehicle
3. Exit Lot

### Arriving Vehicle

Main screen are for vehicles entering the lot for the first time.  It is assumed that when a vehicle provides a ticket but is beyond the one hour threshold, or the vehicle doesn't provide a current parking ticket, a new parking ticket will be issued.

### Returning Vehicle

When an arriving vehicle presents a parking ticket that is on the current day, this simulated use case will confirm if the vehicle is within the one hour exit grace period.  If it is within range, the vehicle will then continue to enter the lot.  The lot rate will change however should the vehicle park in a larger or smaller lot space previously from their first entry.  

If the returning vehicle doesn't present a ticket or if the ticket presented is outside the one hour grace period, then the "Arriving Vehicle" use case is the entry point.

### Exit Lot

This is the simplest out of the other use cases. Upon vehicle exit, the lot exit timestamp is noted.  A validation if the lot entry timestamp and lot exit timestamp is within the 24 hours period.  If it is, rate calculation is based on the rate of the lot the vehicle parked at.  If lot exit timestamp is over the 24 hours period, then the calculated rate multiplied by the number of hours parked and additional P5000 will be the parking fee.  The lot exit timestamp is then recorded that will be referenced by the "Arriving Vehicle" and "Returning Vehicle" use case scenario. 

### Final Note

The above uses have been implemented to simulate a simple good day scenario.  It doesn't have logic to determine if the right vehicle size is in the correct parking lot.  It is assumed that a small vehicle can park in any of the other lots.