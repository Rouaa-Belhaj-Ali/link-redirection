import { Request, Response, NextFunction } from 'express';
import geoip from 'geoip-lite';

export const extractRequestInfo = (req: Request, res: Response, next: NextFunction) => {
	// Extract IP address
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
	const ipString = typeof ip === 'string' ? ip : ip[0];

	// Extract country
	const geo = geoip.lookup(ipString);
	req.country = geo ? geo.country : 'US';

	// Extract video ID
	const videoId = req.query.v;
	if (videoId && typeof videoId === 'string') {
		req.videoId = videoId;
	}

	next();
};
