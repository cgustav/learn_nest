
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum PatchSize {
    SMALL = "SMALL",
    LARGE = "LARGE"
}

export interface Launch {
    id: string;
    site?: string;
    mission?: Mission;
    rocket?: Rocket;
    isBooked: boolean;
}

export interface Rocket {
    id: string;
    name?: string;
    type?: string;
}

export interface Mission {
    name?: string;
    missionPatch?: string;
}

export interface IQuery {
    launches(): Launch[] | Promise<Launch[]>;
    launch(id: string): Launch | Promise<Launch>;
}
