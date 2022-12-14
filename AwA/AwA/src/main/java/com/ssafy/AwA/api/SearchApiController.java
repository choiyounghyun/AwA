package com.ssafy.AwA.api;

import com.ssafy.AwA.dto.ArtworkResponseDto;
import com.ssafy.AwA.dto.SearchRequestDto;
import com.ssafy.AwA.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchApiController {

    private final SearchService searchService;

    @PostMapping("title/{title}")
    public List<ArtworkResponseDto> getSearchByTitle(@PathVariable("title") String title, @RequestBody @Valid SearchRequestDto searchRequestDto) {
        return searchService.getSearchByTitle(title, searchRequestDto);
    }

    @PostMapping("writer/{nickname}")
    public List<ArtworkResponseDto> getSearchByWriter(@PathVariable("nickname") String writer, @RequestBody @Valid SearchRequestDto searchRequestDto) {
        return searchService.getSearchByWriter(writer, searchRequestDto);
    }
}
