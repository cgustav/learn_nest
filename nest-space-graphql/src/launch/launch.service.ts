import { Injectable, HttpService } from '@nestjs/common';
import { SpaceXLaunch, LaunchModel } from './launch.model';
import { forkJoin, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

/**
 * Para aplicar transformación de
 * objetos provenientes de un
 * observable. Emite los objetos
 * transformados como un observable.
 *
 * Similar a la misma lógica
 * en que deseariamos transformar
 * eventos en un stream (por ejemplo).
 */
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LaunchService {
  //SpaceX API
  private apiURL = 'http://api.spacexdata.com/v3';

  constructor(private http: HttpService) {}

  /**
   * "Plantilla" para transformar (mediante object mapping)
   * todos los lanzamientos de cohetes espaciales
   * provenientes desde la API de SpaceX V3 al esquema
   * GraphQL específico de lanzamientos en el módulo
   * [launch].
   *
   * @param launch SpaceXLaunch
   * @returns model LaunchModel
   */
  private toLaunch(launch: SpaceXLaunch): LaunchModel {
    return {
      id: String(launch.flight_number || 0),
      mission: {
        name: launch.mission_name,
        missionPatchLarge: launch.links.mission_patch,
        missionPatchSmall: launch.links.mission_patch_small,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
      site: launch.launch_site && launch.launch_site.site_name,
    };
  }

  /**
   * Retorna el equema de consulta para todos
   * los lanzamientos de cohetes desde la API
   * SpaceX V3.
   */
  getAllLaunches(): Observable<LaunchModel[]> {
    return this.http
      .get<SpaceXLaunch[]>(`${this.apiURL}/launches`)
      .pipe(map(({ data }) => data.map(this.toLaunch)));
  }

  /**
   * Retorna el esquema de consulta para
   * lanzamientos específicos de cohetes
   * desde la API SpaceX V3
   *
   * @param launchID number
   */
  getLaunchById(launchID: number): Observable<LaunchModel> {
    return this.http
      .get<SpaceXLaunch>(`${this.apiURL}/launches/${launchID}`)
      .pipe(map(({ data }) => this.toLaunch(data)));
  }

  getLaunchByIds(ids: number[]) {
    return ids.length
      ? forkJoin(ids.map(id => this.getLaunchById(id))).pipe(
          mergeMap(res => of(res)),
        )
      : of([]);
  }
}
