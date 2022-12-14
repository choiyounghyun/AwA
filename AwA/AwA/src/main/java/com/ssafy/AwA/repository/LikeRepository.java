package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.like.Likes;
import com.ssafy.AwA.domain.profile.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Likes, Long> {
    @Query("select l from Likes l where l.artwork=:artwork and l.profile=:profile")
    Likes findByArtworkAndProfile(@Param("artwork") Artwork targetArtwork,@Param("profile") Profile targetProfile);

    @Query(value = "SELECT artwork_id FROM likes GROUP BY artwork_id ORDER BY COUNT(*) desc",nativeQuery = true)
    List<Long> getTopLikeArtwork();

    @Query("select L.artwork from Likes L where L.profile=:profile")
    List<Artwork> findAllByProfile(@Param("profile") Profile profile);


    @Query("select L from Likes L where L.profile=:profile")
    List<Likes> findAllByfromProfile(@Param("profile") Profile profile);
}
