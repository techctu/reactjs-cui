import React from 'react';

/**
 * Single slot of a slot machine. 
 * A Slot contain a list of pictures with name. 
 * It can init with a certain picture and stop with certain picture which should be determined by server side. 
 * ------------
 * It just like 
 *   || A ||
 *   || B ||
 *   || C ||
 * ------------
 */
class Slot extends React.Component {

}

Slot.displayName = 'Slot';
Slot.prototypes = {
    items: React.prototypes.Array.isRequired,
};

class SlotItem extends React.Component {

}

export default {
    Slot
};
