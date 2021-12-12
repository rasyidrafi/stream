import axios from 'axios';
import * as https from 'https';

const rootAPI = process.env.NEXT_PUBLIC_API;
const keyAPI = process.env.NEXT_PUBLIC_KEY;
const rootStream = process.env.STREAMSB_PUBLIC_API;
const streamAPI = process.env.STREAMSB_PUBLIC_KEY;
const streamFolderId = process.env.STREAMSB_MOVIE_FOLDER_ID;

interface streamMovRes {
  thumbnail: string;
  link: string;
  file_code: string;
  canplay: number;
  length: string;
  views: string;
  uploaded: string;
  public: string;
  fld_id: string;
  title: string;
}

interface streamResult {
  status: number;
  msg: string;
  result: {
    files: streamMovRes[];
    results_total: string;
    results: number;
  };
}

export async function getMoviesUrl(idm: number) {
  const stringIdm = idm.toString();
  let url = `${rootStream}/file/list?key=${streamAPI}&page=1&per_page=5&fld_id=${streamFolderId}`;

  const responses = await axios({
    url: url,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json',
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  });

  const data = responses.data as streamResult;
  const files = data.result.files;
  const filtered = files.filter((mov) => mov.title == stringIdm);
  
  return {
    status: filtered.length == 0 ? false : true,
    data: filtered[0] ?? null,
  };
}

export async function getCategories() {
  const axiosResponse = await axios.get(
    `${rootAPI}/genre/movie/list?${keyAPI}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getDetailMovie(idm: number) {
  const axiosResponse = await axios.get(`${rootAPI}/movie/${idm}?${keyAPI}`);
  const { data } = axiosResponse;
  return data;
}

export async function getVideoTrailer(idm: number) {
  const axiosResponse = await axios.get(
    `${rootAPI}/movie/${idm}/videos?${keyAPI}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getSimilarMovies(idm: number) {
  const axiosResponse = await axios.get(
    `${rootAPI}/movie/${idm}/similar?${keyAPI}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getCategoryMovies(idc: number, page = 1) {
  const axiosResponse = await axios.get(
    `${rootAPI}/discover/movie?${keyAPI}&with_genres=${idc}&page=${page}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getTrendingMovies(param: string, page = 1) {
  const axiosResponse = await axios.get(
    `${rootAPI}/trending/movie/${param}?${keyAPI}&page=${page}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getMovies(param: string, page = 1) {
  const axiosResponse = await axios.get(
    `${rootAPI}/movie/${param}?${keyAPI}&page=${page}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getResultMovies(query: string) {
  const axiosResponse = await axios.get(
    `${rootAPI}/search/movie?${keyAPI}&query=${query}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getCredits(idm: number) {
  const axiosResponse = await axios.get(
    `${rootAPI}/movie/${idm}/credits?${keyAPI}`
  );
  const { data } = axiosResponse;
  return data;
}
