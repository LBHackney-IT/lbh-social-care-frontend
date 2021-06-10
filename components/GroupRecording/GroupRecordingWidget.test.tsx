import GroupRecordingWidget from "./GroupRecordingWidget"
import { render, screen } from "@testing-library/react"

// TODO: once the group recording widget is production ready, write its tests

const mockPerson = {
  mosaicId: "1",
  firstName: "Bart",
  lastName: "Simpson",
  dateOfBirth: "1990-04-10T00:00:00.0000000",
  addressList: [
    {
      addressLine1: "123 Town St, Citythorpe, AB1 23C",
    },
  ],
}

describe("GroupRecordingWidget", () => {
  it("shows one person intitially", () => {
    render(<GroupRecordingWidget initialPerson={mockPerson} />)
    expect(screen.getByText("Bart Simpson"))
    expect(screen.getByText("Link another person"))
  })
  //   it("allows people to be added and removed", () => {})
  //   it("allows widgets to be expanded and collapsed when there are more than one", () => {})
})
