const faunadb = require("faunadb");
const q = faunadb.query;

var client = new faunadb.Client({ secret: process.env.FAUNA });

async function run() {
  //   const results = await client.query(
  //     q.Update(q.Ref(q.Collection("todos"), "282127647700419084"), {
  //       data: {
  //         done: true,
  //       },
  //     })
  //   );
  //   console.log(results);

  //   const results = await client.query(
  //     q.Create(q.Collection("todos"), {
  //       data: {
  //         text: "Third my todo!",
  //         done: false,
  //         owner: "user-test-1",
  //       },
  //     })
  //   );
  //   console.log(results.ref.id);

  const results = await client.query(
    q.Paginate(q.Match(q.Index("todos_by_user"), "user-test-2"))
  );
  console.log(results);
}

run();
