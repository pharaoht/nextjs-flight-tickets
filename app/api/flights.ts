import { NextApiRequest, NextApiResponse } from 'next';

function findFlights( req: NextApiRequest, res: NextApiResponse){
     res.json({data: 'hi'})
};

export default findFlights;